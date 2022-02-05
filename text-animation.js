import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color, MeshPhongMaterial, AmbientLight } from 'three';
import { FontLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'https://cdn.skypack.dev/three/examples/jsm/geometries/TextGeometry';

const scene = new Scene();
const light = new AmbientLight(0xffffff);
const container = document.querySelector('#page-signature');
const staticSignature = container.querySelector('#static-signature');
let staticShowing = true;
const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const fontLoader = new FontLoader();
const renderer = new WebGLRenderer({ alpha: true});
let fontGeometry;
const materials = [
    new MeshPhongMaterial( { color: '#FFF'} ), // front
    new MeshPhongMaterial( { color: '#000000'} ) // side
];
let textMesh;

scene.add(light);



camera.position.set( 0, 0, 40);
camera.lookAt(0,0,0);

renderer.setSize( container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

fontLoader.load("https://cdn.skypack.dev/three/examples/fonts/helvetiker_regular.typeface.json", (font) => {
    fontGeometry = new TextGeometry("Full Stack Web Developer", {
        font: font,
        size: 22,
        height: 1,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 10
    });
    
    textMesh = new Mesh(fontGeometry, materials);
    textMesh.position.y = -20;
    fontGeometry.computeBoundingBox();
    const centerOffset = - 0.5 * ( fontGeometry.boundingBox.max.x - fontGeometry.boundingBox.min.x );
    textMesh.position.x = centerOffset;
    scene.add(textMesh);
});

renderer.render(scene, camera);
scene.direction = 'positive';
function animate() {
    requestAnimationFrame(animate);
    if (textMesh) {
        if (staticShowing) {
            container.removeChild(staticSignature);
            staticShowing = false;
        }
        if (scene.direction === 'positive')  {
            scene.rotation.y += .0002
            if (scene.rotation.y > .07) scene.direction = 'negative';
        }
        else if (scene.direction === 'negative') {
            scene.rotation.y -= .0002
            if (scene.rotation.y < -.07) scene.direction = 'positive';
        } 
        
    }
    renderer.render(scene, camera);
}
animate()
