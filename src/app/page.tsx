"use client";

export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center p-6 flex flex-col text-white font-inter"
      style={{
        backgroundImage: "url('../assets/security_pic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to Dim Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Container for Both Headings */}
        <div className="text-center items-start justify-center">
          <h1 className="text-5xl font-semibold mb-11">
            Welcome to P-SIRM<sup>2</sup> Vulnerability Tool
          </h1>
        </div>
        <div className="items-center justify-start">
          <h2 className="text-3xl font-semibold mt-4 ml-2 text-blue-400">
            Probabilistic Space IoT Risk Management Methodology (P-SIRM
            <sup>2</sup>)
          </h2>
          <div className="flex flex-row justify-between">
            <p className="mt-6 ml-11 text-xl font-medium leading-loose">
              A novel risk management methodology which leverages a
              deterministic
              <br /> analysis using the Euclidean distance algorithm and
              probabilistic <br />
              Monte Carlo- based model for evaluating the likelihood/frequency
              <br /> and impact/severity of vulnerabilities within space IoT
              systems.
            </p>

            <div className="flex items-center justify-end mr-11">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-2 px-4 rounded-full h-16 w-40"
                onClick={() => {
                  window.location.href = "/users";
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
