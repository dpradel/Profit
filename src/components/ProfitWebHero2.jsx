import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Button } from "./Button.jsx";

const LAPTOP_SRC = `${import.meta.env.BASE_URL || "/"}laptop.glb`;
const SCREEN_BASE = `${import.meta.env.BASE_URL || "/"}screen-base.png`;
const SCREEN_EMIT = `${import.meta.env.BASE_URL || "/"}screen-emission.png`;

const CLOSED = Math.PI * 1.5;
const OPEN = Math.PI;

// Studio mode: full 3D editor panel. Set false for production.
const STUDIO = true;

let nextLightId = 1;

const DEFAULT_LIGHTS = [
  { id: nextLightId++, type: "ambient", color: "#24344d", intensity: 0.5 },
  { id: nextLightId++, type: "point", color: "#2b7fff", intensity: 6, x: 0, y: -0.9, z: 0.6, distance: 4, decay: 1.5 },
  { id: nextLightId++, type: "directional", color: "#3d8bff", intensity: 2.2, x: 0, y: -1, z: -5 },
];

const DEFAULT_STATE = {
  model: { scale: 0.11, px: 0, py: -0.1, pz: 0, rx: 0, ry: 0, rz: 0 },
  camera: { y: 1.1, z: 5, fov: 38 },
  material: { preset: "original", color: "#8a8a8a", metalness: 0.5, roughness: 0.5 },
  screen: { emissive: 1.0 },
  fx: { exposure: 1.0, blur: 0, grain: 0, brightness: 1, contrast: 1, saturation: 1 },
};

const MATERIAL_PRESETS = {
  original: null,
  "matte plastic": { metalness: 0.0, roughness: 0.9 },
  "glossy plastic": { metalness: 0.0, roughness: 0.15 },
  "brushed metal": { metalness: 0.9, roughness: 0.45 },
  "polished metal": { metalness: 1.0, roughness: 0.1 },
  "soft touch": { metalness: 0.2, roughness: 0.7 },
};

export function ProfitWebHero2() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progress = useRef(0);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const frameMeshRef = useRef(null);
  const screenMatRef = useRef(null);
  const lightObjsRef = useRef(new Map());

  const [lights, setLights] = useState(DEFAULT_LIGHTS);
  const [cfg, setCfg] = useState(DEFAULT_STATE);

  // ---------- Three.js scene ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.1, 5);
    cameraRef.current = camera;

    let screenNode = null;

    const texLoader = new THREE.TextureLoader();
    const baseTex = texLoader.load(SCREEN_BASE, (tex) => { tex.flipY = false; tex.needsUpdate = true; });
    const emitTex = texLoader.load(SCREEN_EMIT, (tex) => { tex.flipY = false; tex.needsUpdate = true; });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(LAPTOP_SRC, (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(0.11);
      model.position.set(0, -0.1, 0);
      modelRef.current = model;
      model.traverse((obj) => {
        if (obj.name === "Screen") screenNode = obj;
        if (obj.name === "Frame_ComputerFrame_0" && obj.isMesh) {
          obj.material = obj.material.clone();
          obj.userData.origMetalness = obj.material.metalness;
          obj.userData.origRoughness = obj.material.roughness;
          obj.userData.origColor = obj.material.color.clone();
          frameMeshRef.current = obj;
        }
        if (obj.name === "Screen_ComputerScreen_0" && obj.isMesh) {
          obj.material = obj.material.clone();
          obj.material.map = baseTex;
          obj.material.emissiveMap = emitTex;
          obj.material.emissive = new THREE.Color(1, 1, 1);
          obj.material.emissiveIntensity = 1;
          obj.material.roughness = 0.2;
          obj.material.needsUpdate = true;
          screenMatRef.current = obj.material;
        }
      });
      scene.add(model);
    });

    const resize = () => {
      const w = canvas.parentElement?.offsetWidth || window.innerWidth;
      const h = canvas.parentElement?.offsetHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    let screenRot = CLOSED;
    const lerp = (a, b, t) => a + (b - a) * t;

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const target = CLOSED + (OPEN - CLOSED) * progress.current;
      screenRot = lerp(screenRot, target, 0.1);
      if (screenNode) screenNode.rotation.x = screenRot;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  // ---------- Sync lights state -> scene ----------
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const objs = lightObjsRef.current;

    // Remove deleted
    for (const [id, entry] of objs) {
      if (!lights.find((l) => l.id === id)) {
        scene.remove(entry.light);
        if (entry.light.target) scene.remove(entry.light.target);
        if (entry.helper) scene.remove(entry.helper);
        objs.delete(id);
      }
    }

    // Add / update
    lights.forEach((l) => {
      let entry = objs.get(l.id);
      let obj = entry?.light;
      const needsType =
        (l.type === "ambient" && !(obj instanceof THREE.AmbientLight)) ||
        (l.type === "directional" && !(obj instanceof THREE.DirectionalLight)) ||
        (l.type === "point" && !(obj instanceof THREE.PointLight)) ||
        (l.type === "spot" && !(obj instanceof THREE.SpotLight));

      if (!obj || needsType) {
        if (entry) {
          scene.remove(entry.light);
          if (entry.light.target) scene.remove(entry.light.target);
          if (entry.helper) scene.remove(entry.helper);
        }
        if (l.type === "ambient") obj = new THREE.AmbientLight();
        else if (l.type === "directional") obj = new THREE.DirectionalLight();
        else if (l.type === "point") obj = new THREE.PointLight();
        else obj = new THREE.SpotLight();
        scene.add(obj);
        if (obj.target) scene.add(obj.target);

        // Visual helper so you can see where the light sits
        let helper = null;
        if (l.type === "directional") helper = new THREE.DirectionalLightHelper(obj, 0.4);
        else if (l.type === "point") helper = new THREE.PointLightHelper(obj, 0.15);
        else if (l.type === "spot") helper = new THREE.SpotLightHelper(obj);
        if (helper) scene.add(helper);

        entry = { light: obj, helper };
        objs.set(l.id, entry);
      }

      obj.color.set(l.color);
      obj.intensity = l.intensity;
      if (l.type !== "ambient") obj.position.set(l.x ?? 0, l.y ?? 0, l.z ?? 0);
      if (l.type === "point" || l.type === "spot") {
        obj.distance = l.distance ?? 0;
        obj.decay = l.decay ?? 2;
      }
      if (l.type === "spot") {
        obj.angle = l.angle ?? Math.PI / 6;
        obj.penumbra = l.penumbra ?? 0.5;
        obj.target.position.set(l.tx ?? 0, l.ty ?? 0, l.tz ?? 0);
      }
      if (entry.helper) entry.helper.update?.();
    });
  }, [lights]);

  // ---------- Sync cfg -> model / camera / material / fx ----------
  useEffect(() => {
    const m = modelRef.current;
    if (m) {
      m.scale.setScalar(cfg.model.scale);
      m.position.set(cfg.model.px, cfg.model.py, cfg.model.pz);
      m.rotation.set(cfg.model.rx, cfg.model.ry, cfg.model.rz);
    }
    const cam = cameraRef.current;
    if (cam) {
      cam.position.set(0, cfg.camera.y, cfg.camera.z);
      cam.fov = cfg.camera.fov;
      cam.updateProjectionMatrix();
    }
    const frame = frameMeshRef.current;
    if (frame) {
      const preset = MATERIAL_PRESETS[cfg.material.preset];
      if (preset === null) {
        frame.material.metalness = frame.userData.origMetalness;
        frame.material.roughness = frame.userData.origRoughness;
        frame.material.color.copy(frame.userData.origColor);
      } else {
        frame.material.metalness = cfg.material.metalness;
        frame.material.roughness = cfg.material.roughness;
        frame.material.color.set(cfg.material.color);
      }
      frame.material.needsUpdate = true;
    }
    if (screenMatRef.current) {
      screenMatRef.current.emissiveIntensity = cfg.screen.emissive;
    }
    const renderer = rendererRef.current;
    if (renderer) {
      renderer.toneMappingExposure = cfg.fx.exposure;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.filter =
        `blur(${cfg.fx.blur}px) brightness(${cfg.fx.brightness}) ` +
        `contrast(${cfg.fx.contrast}) saturate(${cfg.fx.saturation})`;
    }
  }, [cfg]);

  // Re-apply cfg once the model finishes loading
  useEffect(() => {
    if (!STUDIO) return;
    const t = setInterval(() => {
      if (modelRef.current && frameMeshRef.current) {
        setCfg((c) => ({ ...c }));
        clearInterval(t);
      }
    }, 250);
    return () => clearInterval(t);
  }, []);

  // ---------- Scroll scrub ----------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const entranceRaf = requestAnimationFrame(() => el.classList.add("is-visible"));
    const copy = el.querySelector(".pw2-hero-copy");
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    let smooth = 0;
    let rafId;

    function tick() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      const raw = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      smooth = lerp(smooth, raw, 0.1);
      progress.current = smooth;

      if (copy) {
        const cp = clamp(smooth / 0.45, 0, 1);
        copy.style.opacity = String(1 - cp);
        copy.style.transform = `translateY(${cp * -44}px)`;
        copy.style.filter = `blur(${cp * 8}px)`;
        copy.style.pointerEvents = cp > 0.5 ? "none" : "";
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(entranceRaf);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="pw2-hero" ref={sectionRef}>
      <div className="pw2-hero-stage">
        <div className="pw-hero-bg" aria-hidden="true" />
        <div className="pw-hero-blob pw-hero-blob-a" aria-hidden="true" />
        <div className="pw-hero-blob pw-hero-blob-b" aria-hidden="true" />
        <div className="pw-hero-grid" aria-hidden="true" />

        <div className="pw2-hero-copy">
          <h1 className="pw-hero-title">
            Profit <span className="pw-hero-title-accent">Web</span>
          </h1>
          <p className="pw-hero-subtitle">
            Mais leve, mais rápido e mais eficiente que nunca.
          </p>
          <div className="pw-hero-cta">
            <Button href="#acesso" variant="gradient">Acesse agora pelo seu navegador</Button>
          </div>
        </div>

        <div className="pw2-hero-canvas">
          <canvas ref={canvasRef} />
          {cfg.fx.grain > 0 && (
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              opacity: cfg.fx.grain,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }} />
          )}
        </div>
      </div>

      {STUDIO && (
        <StudioPanel
          lights={lights}
          setLights={setLights}
          cfg={cfg}
          setCfg={setCfg}
        />
      )}
    </section>
  );
}

// ============================================================
// Studio panel
// ============================================================

const S = {
  panel: {
    position: "fixed", top: 12, right: 12, bottom: 12, zIndex: 9999, width: 320,
    background: "rgba(8,10,16,0.92)", color: "#e6e9f0", borderRadius: 12,
    fontSize: 12, fontFamily: "monospace", overflowY: "auto",
    backdropFilter: "blur(10px)", border: "1px solid #2a3040", padding: 14,
  },
  h: { fontWeight: "bold", color: "#38bdf8", margin: "14px 0 6px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 },
  row: { display: "flex", alignItems: "center", gap: 6, marginBottom: 3 },
  label: { width: 62, color: "#9aa3b5", flexShrink: 0 },
  val: { width: 40, textAlign: "right", flexShrink: 0 },
  slider: { flex: 1, accentColor: "#38bdf8", minWidth: 0 },
  btn: {
    background: "#1b2230", color: "#e6e9f0", border: "1px solid #33405a",
    borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11, fontFamily: "monospace",
  },
  del: {
    background: "#3a1520", color: "#ff7a8a", border: "1px solid #5a2432",
    borderRadius: 6, padding: "1px 7px", cursor: "pointer", fontSize: 11, marginLeft: "auto",
  },
  lightCard: { border: "1px solid #262e40", borderRadius: 8, padding: 8, marginBottom: 8, background: "rgba(20,26,40,0.5)" },
  select: {
    background: "#1b2230", color: "#e6e9f0", border: "1px solid #33405a",
    borderRadius: 6, padding: "2px 4px", fontSize: 11, fontFamily: "monospace",
  },
};

function Slider({ label, value, min, max, step, onChange, digits = 2 }) {
  const [text, setText] = useState(null); // null = not editing
  const commit = () => {
    if (text === null) return;
    const v = parseFloat(text);
    if (!Number.isNaN(v)) onChange(v);
    setText(null);
  };
  return (
    <div style={S.row}>
      <span style={S.label}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} style={S.slider}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
      <input
        type="text"
        value={text ?? Number(value).toFixed(digits)}
        onFocus={(e) => { setText(String(value)); e.target.select(); }}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        style={{
          width: 46, flexShrink: 0, background: "#141a28", color: "#e6e9f0",
          border: "1px solid #2a3550", borderRadius: 4, fontSize: 11,
          fontFamily: "monospace", textAlign: "right", padding: "1px 3px",
        }}
      />
    </div>
  );
}

function ColorRow({ label, value, onChange }) {
  const [text, setText] = useState(null);
  const commit = () => {
    if (text === null) return;
    let v = text.trim();
    if (/^[0-9a-fA-F]{6}$/.test(v)) v = "#" + v;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v.toLowerCase());
    setText(null);
  };
  return (
    <div style={S.row}>
      <span style={S.label}>{label}</span>
      <span style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
        background: value, border: "1px solid #3a4560",
      }} />
      <input
        type="text"
        value={text ?? value}
        onFocus={(e) => { setText(value); e.target.select(); }}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        style={{
          width: 70, background: "#141a28", color: "#e6e9f0",
          border: "1px solid #2a3550", borderRadius: 4, fontSize: 11,
          fontFamily: "monospace", padding: "1px 4px",
        }}
      />
    </div>
  );
}

function StudioPanel({ lights, setLights, cfg, setCfg }) {
  const upLight = (id, patch) =>
    setLights((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const delLight = (id) => setLights((ls) => ls.filter((l) => l.id !== id));
  const addLight = (type) => {
    const base = { id: nextLightId++, type, color: "#4488ff", intensity: 1 };
    if (type !== "ambient") Object.assign(base, { x: 0, y: 2, z: 2 });
    if (type === "point" || type === "spot") Object.assign(base, { distance: 0, decay: 2 });
    if (type === "spot") Object.assign(base, { angle: Math.PI / 6, penumbra: 0.5, tx: 0, ty: 0, tz: 0 });
    setLights((ls) => [...ls, base]);
  };
  const set = (group, key, v) => setCfg((c) => ({ ...c, [group]: { ...c[group], [key]: v } }));

  const copyConfig = () => {
    const out = JSON.stringify({ cfg, lights }, null, 2);
    navigator.clipboard.writeText(out);
  };

  return (
    <div style={S.panel}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ ...S.h, margin: 0 }}>3D Studio</span>
        <button style={S.btn} onClick={copyConfig}>📋 Copy config</button>
      </div>

      <div style={S.h}>Laptop</div>
      <Slider label="Scale" value={cfg.model.scale} min={0.03} max={0.4} step={0.005} onChange={(v) => set("model", "scale", v)} digits={3} />
      <Slider label="Pos X" value={cfg.model.px} min={-2} max={2} step={0.05} onChange={(v) => set("model", "px", v)} />
      <Slider label="Pos Y" value={cfg.model.py} min={-2} max={2} step={0.05} onChange={(v) => set("model", "py", v)} />
      <Slider label="Pos Z" value={cfg.model.pz} min={-2} max={2} step={0.05} onChange={(v) => set("model", "pz", v)} />
      <Slider label="Rot X" value={cfg.model.rx} min={-1.6} max={1.6} step={0.01} onChange={(v) => set("model", "rx", v)} />
      <Slider label="Rot Y" value={cfg.model.ry} min={-3.14} max={3.14} step={0.01} onChange={(v) => set("model", "ry", v)} />
      <Slider label="Rot Z" value={cfg.model.rz} min={-1.6} max={1.6} step={0.01} onChange={(v) => set("model", "rz", v)} />

      <div style={S.h}>Camera</div>
      <Slider label="Cam Y" value={cfg.camera.y} min={-1} max={4} step={0.05} onChange={(v) => set("camera", "y", v)} />
      <Slider label="Cam Z" value={cfg.camera.z} min={1} max={12} step={0.1} onChange={(v) => set("camera", "z", v)} />
      <Slider label="FOV" value={cfg.camera.fov} min={15} max={90} step={1} onChange={(v) => set("camera", "fov", v)} digits={0} />

      <div style={S.h}>Screen</div>
      <Slider label="Emissive" value={cfg.screen.emissive} min={0} max={3} step={0.05} onChange={(v) => set("screen", "emissive", v)} />

      <div style={S.h}>Frame material</div>
      <div style={S.row}>
        <span style={S.label}>Preset</span>
        <select style={S.select} value={cfg.material.preset}
          onChange={(e) => {
            const preset = e.target.value;
            const p = MATERIAL_PRESETS[preset];
            setCfg((c) => ({
              ...c,
              material: p
                ? { ...c.material, preset, metalness: p.metalness, roughness: p.roughness }
                : { ...c.material, preset },
            }));
          }}>
          {Object.keys(MATERIAL_PRESETS).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>
      {cfg.material.preset !== "original" && (
        <>
          <ColorRow label="Color" value={cfg.material.color} onChange={(v) => set("material", "color", v)} />
          <Slider label="Metal" value={cfg.material.metalness} min={0} max={1} step={0.01} onChange={(v) => set("material", "metalness", v)} />
          <Slider label="Rough" value={cfg.material.roughness} min={0} max={1} step={0.01} onChange={(v) => set("material", "roughness", v)} />
        </>
      )}

      <div style={S.h}>Effects</div>
      <Slider label="Exposure" value={cfg.fx.exposure} min={0.2} max={2.5} step={0.05} onChange={(v) => set("fx", "exposure", v)} />
      <Slider label="Blur" value={cfg.fx.blur} min={0} max={10} step={0.1} onChange={(v) => set("fx", "blur", v)} digits={1} />
      <Slider label="Grain" value={cfg.fx.grain} min={0} max={1} step={0.02} onChange={(v) => set("fx", "grain", v)} />
      <Slider label="Bright" value={cfg.fx.brightness} min={0.3} max={2} step={0.02} onChange={(v) => set("fx", "brightness", v)} />
      <Slider label="Contrast" value={cfg.fx.contrast} min={0.3} max={2} step={0.02} onChange={(v) => set("fx", "contrast", v)} />
      <Slider label="Saturate" value={cfg.fx.saturation} min={0} max={2.5} step={0.02} onChange={(v) => set("fx", "saturation", v)} />

      <div style={S.h}>Lights ({lights.length})</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
        <button style={S.btn} onClick={() => addLight("ambient")}>+ Ambient</button>
        <button style={S.btn} onClick={() => addLight("directional")}>+ Direct</button>
        <button style={S.btn} onClick={() => addLight("point")}>+ Point</button>
        <button style={S.btn} onClick={() => addLight("spot")}>+ Spot</button>
      </div>

      {lights.map((l) => (
        <div key={l.id} style={S.lightCard}>
          <div style={{ ...S.row, marginBottom: 6 }}>
            <span style={{ color: "#7dd3fc", fontWeight: "bold" }}>#{l.id} {l.type}</span>
            <button style={S.del} onClick={() => delLight(l.id)}>✕</button>
          </div>
          <ColorRow label="Color" value={l.color} onChange={(v) => upLight(l.id, { color: v })} />
          <Slider label="Intensity" value={l.intensity} min={0} max={10} step={0.1} onChange={(v) => upLight(l.id, { intensity: v })} digits={1} />
          {l.type !== "ambient" && (
            <>
              <Slider label="X" value={l.x} min={-8} max={8} step={0.1} onChange={(v) => upLight(l.id, { x: v })} digits={1} />
              <Slider label="Y" value={l.y} min={-8} max={8} step={0.1} onChange={(v) => upLight(l.id, { y: v })} digits={1} />
              <Slider label="Z" value={l.z} min={-8} max={8} step={0.1} onChange={(v) => upLight(l.id, { z: v })} digits={1} />
            </>
          )}
          {(l.type === "point" || l.type === "spot") && (
            <>
              <Slider label="Distance" value={l.distance} min={0} max={15} step={0.1} onChange={(v) => upLight(l.id, { distance: v })} digits={1} />
              <Slider label="Decay" value={l.decay} min={0} max={4} step={0.1} onChange={(v) => upLight(l.id, { decay: v })} digits={1} />
            </>
          )}
          {l.type === "spot" && (
            <>
              <Slider label="Angle" value={l.angle} min={0.05} max={1.55} step={0.01} onChange={(v) => upLight(l.id, { angle: v })} />
              <Slider label="Penumbra" value={l.penumbra} min={0} max={1} step={0.01} onChange={(v) => upLight(l.id, { penumbra: v })} />
              <Slider label="Target X" value={l.tx} min={-4} max={4} step={0.1} onChange={(v) => upLight(l.id, { tx: v })} digits={1} />
              <Slider label="Target Y" value={l.ty} min={-4} max={4} step={0.1} onChange={(v) => upLight(l.id, { ty: v })} digits={1} />
              <Slider label="Target Z" value={l.tz} min={-4} max={4} step={0.1} onChange={(v) => upLight(l.id, { tz: v })} digits={1} />
            </>
          )}
        </div>
      ))}

      <div style={{ marginTop: 10, fontSize: 11, color: "#667" }}>
        When happy: “📋 Copy config” → paste in chat
      </div>
    </div>
  );
}
