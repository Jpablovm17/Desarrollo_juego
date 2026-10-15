// ===============================
// IMPORTACIONES
// ===============================

// Librería principal de Three.js
import * as THREE from 'three';

// Cargador para modelos .FBX
import { FBXLoader } from 
'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/FBXLoader.js';

// Controles para mover la cámara con el mouse
import { OrbitControls } from 
'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';


// ===============================
// CREAR ESCENA 3D
// ===============================

// Aquí vive todo nuestro mundo 3D
const scene = new THREE.Scene();

// Color del fondo de la escena
scene.background = new THREE.Color(0x222222);


// ===============================
// CREAR CÁMARA
// ===============================

// Cámara con perspectiva realista
const camera = new THREE.PerspectiveCamera(
    75, // Campo de visión
    window.innerWidth / 700, // Relación ancho/alto
    0.1, // Distancia mínima visible
    1000 // Distancia máxima visible
);

// Posición inicial de la cámara
camera.position.set(0, 2, 5);


// ===============================
// CREAR RENDERIZADOR
// ===============================

// Este convierte el mundo 3D en imágenes que vemos en pantalla
const renderer = new THREE.WebGLRenderer({
    antialias: true // Suaviza los bordes
});

// Activar sombras
renderer.shadowMap.enabled = true;


// Tamaño del visor 3D
renderer.setSize(
    window.innerWidth,
    700
);


// Insertar el canvas 3D dentro del HTML
document
.getElementById("escena3d")
.appendChild(renderer.domElement);


// ===============================
// CONTROLES DE CÁMARA
// ===============================

// Permite mover la cámara con el mouse
const controls = new OrbitControls(
    camera,
    renderer.domElement
);


// Movimiento suave
controls.enableDamping = true;

controls.dampingFactor = 0.05;


// Permitir zoom
controls.enableZoom = true;


// Punto donde mira la cámara
controls.target.set(0,1,0);


// ===============================
// ILUMINACIÓN
// ===============================


// Luz general del ambiente
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambientLight);


// Luz principal como si fuera un foco
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    4
);


// Esta luz genera sombras
directionalLight.castShadow = true;


// Posición de la luz
directionalLight.position.set(
    5,
    10,
    5
);


scene.add(directionalLight);


// ===============================
// CREAR SUELO DE EXHIBICIÓN
// ===============================


// Tamaño del piso
const sueloGeometry = new THREE.PlaneGeometry(
    20,
    20
);


// Material del piso
const sueloMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333
});


// Crear objeto 3D del piso
const suelo = new THREE.Mesh(
    sueloGeometry,
    sueloMaterial
);


// Girar el plano para ponerlo horizontal
suelo.rotation.x = -Math.PI / 2;


// Altura del piso
suelo.position.y = 0;


// Activar sombras del piso
suelo.receiveShadow = true;


// Añadirlo al mundo
scene.add(suelo);



// ===============================
// CARGAR MODELO FBX
// ===============================


const loader = new FBXLoader();


loader.load(

    // Ruta del modelo
    '../modelos/Zombiegirl W Kurniawan.fbx',


    // Cuando termina de cargar
    function(modelo){


        // Cambiar tamaño del personaje
        modelo.scale.set(
            0.01,
            0.01,
            0.01
        );


        // Revisar todas las partes del modelo
        modelo.traverse(function(objeto){


            // Si es una malla 3D
            if(objeto.isMesh){


                // Puede crear sombras
                objeto.castShadow = true;


                // Puede recibir sombras
                objeto.receiveShadow = true;

            }

        });


        // Agregar personaje a la escena
        scene.add(modelo);


    },


    // Progreso de carga
    function(xhr){

        console.log(
            "Cargando: " +
            (xhr.loaded / xhr.total * 100)
            + "%"
        );

    },


    // Si ocurre un error
    function(error){

        console.error(
            "Error cargando FBX:",
            error
        );

    }

);



// ===============================
// ANIMACIÓN PRINCIPAL
// ===============================


// Esta función se ejecuta muchas veces por segundo
function animate(){


    requestAnimationFrame(animate);


    // Actualiza los controles del mouse
    controls.update();


    // Renderiza la escena
    renderer.render(
        scene,
        camera
    );

}


// Iniciar escena
animate();