import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#101c27');
  scene.fog = new THREE.FogExp2('#101c27', 0.035);

  const camera = new THREE.PerspectiveCamera(38, 540/960, 0.1, 100);
  camera.position.set(0, 1.2, 10);

  scene.add(new THREE.HemisphereLight(0xb9eaff, 0x14202b, 1.8));
  const key = new THREE.DirectionalLight(0xffd7b0, 3.2);
  key.position.set(-4, 7, 6); scene.add(key);
  const rim = new THREE.PointLight(0x21d9e8, 35, 18);
  rim.position.set(4, 1, -2); scene.add(rim);

  const group = new THREE.Group(); scene.add(group);
  const material = new THREE.MeshPhysicalMaterial({color:'#e9a88f', roughness:.42, metalness:.02, clearcoat:.3});
  const cyan = new THREE.MeshStandardMaterial({color:'#54e7ed', emissive:'#0b8795', emissiveIntensity:1.4, roughness:.25});
  // A branching, stylized nerve: central trunk plus curved branches.
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.22,.32,6,24), material);
  trunk.rotation.z = Math.PI/2; group.add(trunk);
  for (let i=0;i<7;i++) {
    const y = -2.5 + i*.82;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.9,y,0), new THREE.Vector3(-.8,y+.45,0),
      new THREE.Vector3(.25,y+.12,0), new THREE.Vector3(1.65,y+.72,0)
    ]);
    const branch = new THREE.Mesh(new THREE.TubeGeometry(curve,32,.075,10,false), material);
    group.add(branch);
    const node = new THREE.Mesh(new THREE.SphereGeometry(.12,20,16), cyan);
    node.position.copy(curve.getPoint(.5)); group.add(node);
  }
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(.22,32,24), new THREE.MeshStandardMaterial({
    color:'#d9ffff', emissive:'#2af6ff', emissiveIntensity:3, roughness:.15
  }));
  group.add(pulse);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(.34,24,16), new THREE.MeshBasicMaterial({color:'#31efff',transparent:true,opacity:.18}));
  group.add(halo);

  const dust = new THREE.Group();
  const seed = (n)=>{let x=Math.sin(n*127.1)*43758.5453;return x-Math.floor(x)};
  for(let i=0;i<100;i++){
    const p=new THREE.Mesh(new THREE.SphereGeometry(.018+seed(i)*.025,8,6),new THREE.MeshBasicMaterial({color:i%3?'#5aa8b7':'#f7cba7',transparent:true,opacity:.45}));
    p.position.set((seed(i+2)-.5)*12,(seed(i+3)-.5)*15,(seed(i+4)-.5)*5); dust.add(p);
  }
  scene.add(dust);

  function update(t) {
    const u = Math.max(0,Math.min(1,t/6));
    group.rotation.y = Math.sin(t*.55)*.13;
    group.rotation.z = Math.sin(t*.7)*.035;
    camera.position.x = -1.2 + u*2.0;
    camera.position.y = .7 + Math.sin(t*.45)*.25;
    camera.position.z = 10 - Math.sin(u*Math.PI)*1.3;
    camera.lookAt(0,0,0);
    const x = -2.8 + (t/6)*5.6;
    pulse.position.set(x, .18*Math.sin(t*2), .45);
    halo.position.copy(pulse.position);
    const s = 1 + .18*Math.sin(t*8);
    halo.scale.setScalar(s);
    dust.rotation.y = t*.025;
  }
  return {scene,camera,update};
}
