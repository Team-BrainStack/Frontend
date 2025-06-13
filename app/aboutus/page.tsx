import React from 'react';

const TeamSection = () => {
  return (
    <section className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-2">
          Meet the Team <span className="text-3xl">👋</span>
        </h2>
        <p className="text-lg mb-10">
          We are a team of six who collaborated to build MemoryVault, <br />
  a tool designed to capture, organize, and retrieve your important memories with ease.
        </p>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">
            Frontend Team:
          </h3>
          <ul className="space-y-2 pl-4">
            <li>🎨 Charanya A</li>
            <li>🎨 Sharadamani K N</li>
            <li>🎨 Pradvith K J</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            Backend Team:
          </h3>
          <ul className="space-y-2 pl-4">
            <li>🔧 Suhas Y Sunkad</li>
            <li>🔧 Darshan S</li>
            <li>🔧 Sujay P</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
