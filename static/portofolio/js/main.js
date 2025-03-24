// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    const htmlElement = document.documentElement;
    let threeJsScene; // Store scene reference
    let threeJsRenderer; // Store renderer reference for theme updates
    let threeJsFloor; // store color
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        updateIcon(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
        updateIcon(prefersDark ? 'dark' : 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        
        // Update Three.js background when theme changes
        if (threeJsRenderer && threeJsScene) {
            updateThreeJsBackground(newTheme);
        }
    });
    
    // Update icon based on current theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            darkIcon.classList.add('d-none');
            lightIcon.classList.remove('d-none');
        } else {
            lightIcon.classList.add('d-none');
            darkIcon.classList.remove('d-none');
        }
    }
    
    // Function to update Three.js background based on theme
    function updateThreeJsBackground(theme) {
        if (!threeJsRenderer || !threeJsScene) return;
        
        const backgroundColor = theme === 'dark' ? 0x1e1e1e : 0xf0e7db; // Dark mode: #1e1e1e, Light mode: #FAF1E6
        threeJsRenderer.setClearColor(backgroundColor, 0.7);
        
        // Update fog color for the scene
        if (threeJsScene.fog) {
            threeJsScene.fog.color.set(theme === 'dark' ? 0x1e1e1e : 0xd5f8f8);
        }
    }

    // Wait for DOM to load
    // Three.js scene setup for carrot airplane
    const container = document.getElementById('three-container');
    
    if (container) {
        // Carrot Airplane Setup - Define required objects and classes
        
        // Internals object for shared functionality
        const internals = {};
        internals.W = window.innerWidth;
        internals.H = container.clientHeight;

        internals.randomIntFromInterval = (min, max) =>
          Math.floor(Math.random() * (max - min + 1) + min);

        // Materials for the 3D objects
        internals.materials = {
          orange: new THREE.MeshPhongMaterial({ color: 0xB7513C, flatShading: true }),
          green:  new THREE.MeshPhongMaterial({ color: 0x379351, flatShading: true }),
          brown:  new THREE.MeshPhongMaterial({ color: 0x5C2C22, flatShading: true }),
          pink:   new THREE.MeshPhongMaterial({ color: 0xB1325E, flatShading: true }),
          gray:   new THREE.MeshPhongMaterial({ color: 0x666666, flatShading: true }),
          clouds: new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
          rabbit: new THREE.MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true })
        };

        // Shadow support function
        internals.shadowSupport = (group) => {
          group.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
          });
        };

        // Cloud class definition
        class Cloud {
          constructor(config) {
            this.mesh = new THREE.Group();
            const cloud = this._createCould();
            this.mesh.position.x = 200;
            this.mesh.position.y = config.y || Math.random();
            this.mesh.position.z = config.z || 0;
            this.mesh.add(cloud);
            this.animate(config);
          }

          animate(config) {
            TweenMax.to(this.mesh.position, 3.5, {
              x: -200,
              repeat: Infinity,
              delay: config.delay || 0,
              onRepeat: () => {
                this.mesh.position.y = internals.randomIntFromInterval(-10, 20);
              }
            });
          }

          _createCould() {
            const group = new THREE.Group();
            const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
            const cloud = new THREE.Mesh(cloudGeo, internals.materials.clouds);
            cloud.scale.set(1, 0.8, 1);

            const cloud2 = cloud.clone();
            cloud2.scale.set(.55, .35, 1);
            cloud2.position.set(5, -1.5, 2);

            const cloud3 = cloud.clone();
            cloud3.scale.set(.75, .5, 1);
            cloud3.position.set(-5.5, -2, -1);

            group.add(cloud);
            group.add(cloud2);
            group.add(cloud3);

            internals.shadowSupport(group);
            return group;
          }
        }

        // Pilot class definition
        class Pilot {
          constructor() {
            this.mesh = new THREE.Group();
            this.pilot = this._createPilot();
            this.mesh.rotation.x = 1.5;
            this.mesh.position.set(0, 7, 5);
            this.mesh.add(this.pilot);
            this.animate();
          }

          animate() {
            TweenMax.to(this.earPivotL.rotation, 0.1, {
              x: Math.sin(-Math.PI/3),
              repeat: Infinity,
              yoyo: true
            });

            TweenMax.to(this.earPivotR.rotation, 0.1, {
              x: -Math.PI/2.25,
              repeat: Infinity,
              yoyo: true
            });

            TweenMax.to(this.eye.scale, 0.5, {
              y: 0.1,
              repeat: Infinity,
              yoyo: true,
              delay: 5,
              repeatDelay: 3
            });

            TweenMax.to(this.eyeb.scale, 0.5, {
              y: 0.1,
              repeat: Infinity,
              yoyo: true,
              delay: 5,
              repeatDelay: 3
            });
          }

          _createPilot() {
            const group = new THREE.Group();

            const bodyGeo = new THREE.BoxGeometry(5, 5, 5);
         

            const body = new THREE.Mesh(bodyGeo, internals.materials.rabbit);
            body.position.y = 1;
            body.position.z = 4;

            const seatGeo = new THREE.BoxGeometry(6, 1, 6);
            const seat = new THREE.Mesh(seatGeo, internals.materials.brown);
            seat.position.set(0, -2.5, 0);
            seat.rotation.set(.25, 0, 0);
            body.add(seat);

            this.earPivotL = new THREE.Object3D();
            this.earPivotL.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2.5, 0));
            this.earPivotL.rotation.x = -Math.PI/2.25;

            this.earPivotR = this.earPivotL.clone();
            this.earPivotR.rotation.x = -Math.PI/3;

            const earGeo = new THREE.BoxGeometry(2, 6, 0.5);
           

            const ear = new THREE.Mesh(earGeo, internals.materials.rabbit);
            ear.position.x = -1.5;
            ear.position.y = 2.5;

            const earInside = new THREE.Mesh(earGeo, internals.materials.pink);
            earInside.scale.set(.5, .7, .5);
            earInside.position.set(0, 0, .25);
            ear.add(earInside);

            this.earPivotL.add(ear);
            body.add(this.earPivotL);

            const ear2 = ear.clone();
            ear2.position.x = ear.position.x * -1;
            this.earPivotR.add(ear2);
            body.add(this.earPivotR);

            const eyeGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
            const eye = new THREE.Mesh(eyeGeo, internals.materials.gray);
            eye.position.set(1, 0.5, 2.5);
            body.add(eye);
            this.eye = eye;

            const eyeb = eye.clone();
            eyeb.position.x = eye.position.x * -1;
            this.eyeb = eyeb;
            body.add(eyeb);

            const noseGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            
            const nose = new THREE.Mesh(noseGeo, internals.materials.pink);
            nose.position.set(0, -.5, 2.5);
            body.add(nose);

            const mouthGeo = new THREE.BoxGeometry(.25, 0.25, 0.5);
            const mouth = new THREE.Mesh(mouthGeo, internals.materials.gray);
            mouth.position.set(0, -1.5, 2.5);
            body.add(mouth);

            group.add(body);

            internals.shadowSupport(group);

            return group;
          }
        }

        // Carrot class definition
        class Carrot {
          constructor() {
            this.mesh = new THREE.Group();
            this.body = this._createBody();
            this.wings = this._createWings();
            this.leafs = this._createLeafs();
            this.pilot = new Pilot();

            this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
            this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);

            this.mesh.add(this.body);
            this.mesh.add(this.wings);
            this.mesh.add(this.leafs);
            this.mesh.add(this.pilot.mesh);
            

            this.animate();
          }

          animate() {
            TweenMax.to(this.mesh.position, 1, {
              x: -2,
              y: 4,
              repeat: Infinity,
              yoyo: true,
              ease: Sine.easeInOut
            });

            TweenMax.to(this.mesh.rotation, 1, {
              x: -1.7,
              repeat: Infinity,
              yoyo: true,
              ease: Sine.easeInOut
            });

            TweenMax.to(this.leafs.rotation, 0.1, {
              y: Math.PI,
              repeat: Infinity,
              ease: Power0.easeNone
            });
          }

          _createBody() {
            const group = new THREE.Group();
            const bodyGeom = new THREE.CylinderGeometry(5, 2, 25);
            group.add(new THREE.Mesh(bodyGeom, internals.materials.orange));
            internals.shadowSupport(group);
            return group;
          }

          _createWings() {
            const group = new THREE.Group();
            const geometry = new THREE.BoxGeometry(7, 7, 0.5);
            

            const wingR = new THREE.Mesh(geometry, internals.materials.brown);
            wingR.position.x = 6;
            wingR.position.y = 2;
            wingR.position.z = 1;

            const wingL = wingR.clone();
            wingL.position.x = -6;
            wingL.rotation.y = Math.PI;

            group.add(wingR);
            group.add(wingL);
            internals.shadowSupport(group);
            return group;
          }

          _createLeafs() {
            const group = new THREE.Group();
            const geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);
            

            const leafA = new THREE.Mesh(geometry, internals.materials.green);
            leafA.position.y = 16;

            const leafB = leafA.clone();
            leafB.position.x = -1.75;
            leafB.position.y = 15;
            leafB.rotation.z = 0.4;

            const leafC = leafB.clone();
            leafC.position.x = leafB.position.x * -1;
            leafC.rotation.z = leafB.rotation.z * -1;

            group.add(leafA);
            group.add(leafB);
            group.add(leafC);
            internals.shadowSupport(group);
            return group;
          }
        }

        // Scene setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        const camera = new THREE.PerspectiveCamera(45, (internals.W/internals.H), 1, 1000);
        const scene = new THREE.Scene();
        
        
        
        // Store references for theme toggling
        threeJsRenderer = renderer;
        threeJsScene = scene;

        // Setup renderer
        renderer.setPixelRatio(window.devicePixelRatio);
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        renderer.setClearColor(currentTheme === 'dark' ? 0x1e1e1e : 0xf0e7db);
        renderer.setSize(internals.W, internals.H);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);

        // Setup camera
        camera.position.set(25, 15, 30);
        scene.add(camera);
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Add smooth damping effect
        controls.dampingFactor = 0.50;
        controls.minDistance = 30; // Minimum zoom distance
        controls.maxDistance = 140; // Maximum zoom distance
        controls.maxPolarAngle = Math.PI / 2; // Prevent going below the ground

        camera.lookAt(0, 5, 0); // Look at the carrot/pilot area
        controls.target.set(0, 5, 0); // Set orbit controls target

        // Force camera to be exactly 30 units from target on page load
        const setExactCameraDistance = () => {
            const targetPosition = new THREE.Vector3(0, 5, 0);
            const direction = camera.position.clone().sub(targetPosition).normalize();
            camera.position.copy(targetPosition).add(direction.multiplyScalar(30));
            controls.update();
        };

        setExactCameraDistance();
        setTimeout(setExactCameraDistance, 100);

        // Create floor
        const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1000, 1000), 
            new THREE.MeshBasicMaterial({
                color: currentTheme === 'dark' ? 0x1e1e1e : 0xf0e7db,
                
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 150;
        floor.receiveShadow = true;
        scene.add(floor);
        threeJsFloor = floor;

        // Add a separate shadow-catching plane
        const shadowCatcher = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000, 2000),
            new THREE.ShadowMaterial({ 
                opacity: currentTheme === 'dark' ? 0.3 : 0.2 
            })
        );
        shadowCatcher.rotation.x = -Math.PI / 2;
        shadowCatcher.position.y = -12; // Shadow lightly above the floor
        shadowCatcher.receiveShadow = true;
        scene.add(shadowCatcher);

        // Setup lights
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(100, 50, 0);
        directional.castShadow = true;

        // Enhanced shadow map configuration
        directional.shadow.mapSize.width = 4096;
        directional.shadow.mapSize.height = 4096;
        directional.shadow.camera.near = 0.5;
        directional.shadow.camera.far = 600;
        directional.shadow.camera.left = -500;
        directional.shadow.camera.right = 500;
        directional.shadow.camera.top = 300;
        directional.shadow.camera.bottom = -300;
        directional.shadow.bias = -0.0005; // Reduces shadow acne

        scene.add(new THREE.AmbientLight(0xc5f5f5, 0.8)); // Slightly reduced ambient light for better shadow contrast
        scene.add(directional);

        // Function to ensure all objects have shadow settings
        function ensureAllObjectsCastShadows() {
            scene.traverse((object) => {
                if (object instanceof THREE.Group) {
                    internals.shadowSupport(object);
                }
            });
        }

        // Add 3D elements
        scene.add(new Carrot().mesh);
        scene.add(new Cloud({ y: 15, z: 20 }).mesh);
        scene.add(new Cloud({ y: 20, z: -10, delay: 1 }).mesh);
        scene.add(new Cloud({ y: 10, z: -10, delay: 0.5 }).mesh);
        scene.add(new Cloud({ y: 10, z: 10, delay: 2 }).mesh);

        // Update theme colors
        function updateThreeJsBackground(theme) {
            if (!threeJsRenderer || !threeJsScene) return;
            
            const backgroundColor = theme === 'dark' ? 0x1e1e1e : 0xf0e7db; // Dark mode: #1e1e1e, Light mode: #FAF1E6
            threeJsRenderer.setClearColor(backgroundColor, 0.7);
            
            // Update fog color for the scene
            if (threeJsScene.fog) {
                threeJsScene.fog.color.set(theme === 'dark' ? 0x1e1e1e : 0xf0e7db);
            }
            
            // Update floor color when theme changes
            if (threeJsFloor) {
                threeJsFloor.material.color.set(theme === 'dark' ? 0x1e1e1e : 0xf0e7db);
            }
            // Update shadow catcher opacity based on theme
            scene.children.forEach(child => {
                if (child.material instanceof THREE.ShadowMaterial) {
                    child.material.opacity = theme === 'dark' ? 0.3 : 0.2;
                }
            });
        }

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            internals.W = window.innerWidth;
            internals.H = container.clientHeight;
            
            renderer.setSize(internals.W, internals.H);
            camera.aspect = internals.W / internals.H;
            camera.updateProjectionMatrix();
        });

        // Start animation
        animate();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // navbar position
                    behavior: 'smooth'
                });
            }
        });
    });
});


