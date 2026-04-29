import Particles from "react-tsparticles";

const ParticlesBg = () => {
  return (
    <Particles
      options={{
        background: { color: { value: "#050505" } },
        fpsLimit: 60,
        particles: {
          number: { value: 40 },
          color: { value: "#10b981" },
          links: {
            enable: true,
            color: "#10b981",
            distance: 150,
            opacity: 0.2,
          },
          move: {
            enable: true,
            speed: 1,
          },
          size: { value: 2 },
          opacity: { value: 0.3 },
        },
      }}
    />
  );
};

export default ParticlesBg;