import './style.css';
import { ExtrudeGeometryOptions, ExtrudeGeometry, Vector3 } from '@types/three';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { type Vec, Line, getGlyphVector } from '@nclslbrn/plot-writer';

const T = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ']; // An array of possible char used in the composition
const d = 0.04;
const extruderPoints = [
  [-d, -d],
  [d, -d],
  [d, d],
  [-d, d],
];
const extrudesShape = new THREE.Shape();
extrudesShape.moveTo(...extruderPoints[0], 0);
extruderPoints.forEach((pt) => extrudesShape.lineTo(...pt, 0));

const glyphGeom = (size: number[]) => {
  const letter = T[Math.ceil(Math.random() * T.length)];
  const glyph = getGlyphVector(letter, size, [-size[0] / 2, -size[1] / 2]);
  const closedSplines = glyph.map((l: Line) => {
    const unloop = l[0] === l[l.length - 1] ? l.slice(0, -1) : [...l];
    const spline = new THREE.CatmullRomCurve3([
      ...unloop.map((p: Vec) => new THREE.Vector3(...p, 0)),
    ]);
    if (l[0] === l[l.length - 1]) {
      spline.closed = true;
    } else {
      spline.closed = false;
    }
    spline.curveType = 'catmullrom';
    spline.tension = 0;
    return spline;
  });

  return closedSplines.map((spl: THREE.CatmullRoomCurve3) => {
    const extrusion = { steps: spl.arcLengthDivisions, bevelEnabled: false, extrudePath: spl };
    return new THREE.ExtrudeGeometry(extrudesShape, extrusion);
  });
};

class App {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private lightAmbient!: THREE.AmbientLight;
  private lightPoint!: THREE.PointLight;

  private controls!: OrbitControls;
  private stats!: any;

  //private cube!: THREE.Mesh;
  private glyphs!: THREE.Mesh[];
  private plane!: THREE.Mesh;

  constructor() {
    this.initScene();
    this.initStats();
    this.initListeners();
  }

  initStats() {
    this.stats = new (Stats as any)();
    document.body.appendChild(this.stats.dom);
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.lightAmbient = new THREE.AmbientLight(0x666666);
    this.scene.add(this.lightAmbient);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.5;

    this.lightPoint = new THREE.PointLight(0xffffff);
    this.lightPoint.position.set(-0.5, 0.5, 3);
    this.lightPoint.castShadow = true;
    this.lightPoint.intensity = shadowIntensity;
    this.scene.add(this.lightPoint);

    const lightPoint2 = this.lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = true;
    this.scene.add(lightPoint2);

    const mapSize = 1024; // Default 512
    const cameraNear = 0.5; // Default 0.5
    const cameraFar = 500; // Default 500
    this.lightPoint.shadow.mapSize.width = mapSize;
    this.lightPoint.shadow.mapSize.height = mapSize;
    this.lightPoint.shadow.camera.near = cameraNear;
    this.lightPoint.shadow.camera.far = cameraFar;

    // Add a cube
    /*
     const geometryBox = new THREE.BoxGeometry();
		const materialBox = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
		this.cube = new THREE.Mesh(geometryBox, materialBox);
		this.cube.castShadow = true;
		this.scene.add(this.cube);
    */
    this.glyphs = [];
    const glyphMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    for (let y = -2; y <= 2; y += 0.5) {
      for (let x = -2; x <= 2; x += 0.2) {
        const glyphGeometry = glyphGeom([0.2, 1]);
        glyphGeometry.map((geom: ExtrudeGeometry) => {
          const m = new THREE.Mesh(geom, glyphMat);
          //m.rotation.z = Math.PI / 4;
          m.position.x = x;
          m.position.y = y;
          m.rotation.x = Math.PI;
          m.castShadow = true;
          this.scene.add(m);
          this.glyphs.push(m);
        });
      }
    }
    // Add a plane
    const geometryPlane = new THREE.PlaneGeometry(
      window.innerWidth / 80,
      window.innerHeight / 80,
      1,
      1
    );
    const materialPlane = new THREE.MeshPhongMaterial({ color: 0xcccccc });

    this.plane = new THREE.Mesh(geometryPlane, materialPlane);
    this.plane.position.z = -1;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);

    // Init animation
    this.animate();
  }

  initListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    window.addEventListener('keydown', (event) => {
      const { key } = event;

      switch (key) {
        case 'e':
          const win = window.open('', 'Canvas Image');
          const { domElement } = this.renderer;

          // Makse sure scene is rendered.
          this.renderer.render(this.scene, this.camera);
          const src = domElement.toDataURL();

          if (!win) return;
          win.document.write(
            `<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`
          );
          break;

        default:
          break;
      }
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });

    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;

    if (this.stats) this.stats.update();
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
