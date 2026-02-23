import { useNavigate } from "react-router-dom";
import voteVideo from "../assets/vote.mp4";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import HumanGuide from "../components/HumanGuide";

export default function Home(){

  const navigate = useNavigate();
  const bgRef = useRef(null);

  // ================= THREE PARTICLE BACKGROUND =================
  useEffect(()=>{

    const mount = bgRef.current;
    if(!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 1200;
    const positions = new Float32Array(count*3);

    for(let i=0;i<count*3;i++){
      positions[i] = (Math.random()-0.5)*20;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions,3)
    );

    const material = new THREE.PointsMaterial({
      size:0.03,
      color:0xffffff
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = ()=>{
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    };

    animate();

    return ()=>{
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };

  },[]);


  // ================= THREE LOGIN BUTTON =================
  const AnimatedBtn = ({title, role, color}) => {

    const mountRef = useRef(null);

    useEffect(()=>{
      const mount = mountRef.current;
      if(!mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({alpha:true});
      renderer.setSize(80,80);
      mount.appendChild(renderer.domElement);

      const geo = new THREE.TorusKnotGeometry(0.7,0.2,100,16);
      const mat = new THREE.MeshStandardMaterial({
        color:0xffffff,
        metalness:0.8,
        roughness:0.1
      });

      const mesh = new THREE.Mesh(geo,mat);
      scene.add(mesh);

      const light = new THREE.PointLight(0xffffff,1);
      light.position.set(5,5,5);
      scene.add(light);

      const animate = ()=>{
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.02;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
      };

      animate();

      return ()=>{
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        mount.removeChild(renderer.domElement);
      };

    },[]);

    return(
      <button
        onClick={()=>navigate(`/login/${role}`)}
        className={`${color}
        w-60 h-28 rounded-xl text-white text-lg font-bold
        shadow-2xl hover:scale-110 transition
        flex flex-col items-center justify-center backdrop-blur-md`}
      >
        <div ref={mountRef}/>
        {title}
      </button>
    );
  };


  // ================= PAGE UI =================
  return(
    <div className="relative min-h-screen overflow-hidden">

      {/* THREE BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0 z-0"/>
      <HumanGuide />

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={voteVideo} type="video/mp4"/>
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70"/>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <h1 className="text-6xl font-black text-white mb-6 drop-shadow-lg">
          Digital Election Portal
        </h1>

        <p className="text-gray-200 mb-10 text-lg">
          Secure • Transparent • Student Powered
        </p>


        {/* ⭐ INFO CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mb-12">

          {/* COLLEGE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl text-left hover:scale-[1.02] transition">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              About Our College
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>1. Our college nurtures innovation and leadership.</li>
              <li>2. Students gain real-world exposure.</li>
              <li>3. Modern infrastructure enhances learning.</li>
              <li>4. Faculty guide beyond academics.</li>
              <li>5. Diversity strengthens community.</li>
              <li>6. Technology improves education.</li>
              <li>7. Clubs build personality skills.</li>
              <li>8. Ethics and responsibility encouraged.</li>
              <li>9. Alumni success shows excellence.</li>
              <li>10. Leaders are shaped here.</li>
            </ul>
          </div>

          {/* VOTING */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl text-left hover:scale-[1.02] transition">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              Digital Voting System
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>1. Secure authentication protects voters.</li>
              <li>2. Encryption ensures privacy.</li>
              <li>3. Transparent counting builds trust.</li>
              <li>4. Students vote democratically.</li>
              <li>5. Manipulation prevention.</li>
              <li>6. QR verification integrity.</li>
              <li>7. OTP secures ballots.</li>
              <li>8. Results show true choice.</li>
              <li>9. Digital elections save time.</li>
              <li>10. Every vote matters.</li>
            </ul>
          </div>

        </div>


        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedBtn title="Student Login" role="student" color="bg-blue-600"/>
          <AnimatedBtn title="Teacher Login" role="teacher" color="bg-green-600"/>
          <AnimatedBtn title="HOD Login" role="hod" color="bg-purple-600"/>
          <AnimatedBtn title="Principal Login" role="principal" color="bg-red-600"/>
        </div>

      </div>

    </div>
  );
}
