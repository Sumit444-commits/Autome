import React from 'react';
import { ExternalLink, Github, Code2, Rocket } from 'lucide-react';

const projects = [
  {
    title: "GrainUp",
    description: "A web platform connecting food donors with NGOs to reduce waste and fight hunger.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    github: "#",
    demo: "#",
    category: "Social Good"
  },
  {
    title: "AI Code Reviewer",
    description: "Automated code analysis tool using Google Gemini AI to improve code quality.",
    tech: ["MERN Stack", "Gemini AI", "Vercel"],
    github: "#",
    demo: "#",
    category: "AI Tool"
  },
  {
    title: "ThumbGen",
    description: "An AI-powered thumbnail generator using Node.js and Bytez.js for content creators.",
    tech: ["Node.js", "Bytez.js", "Express"],
    github: "#",
    demo: "#",
    category: "Generator"
  },
];

const Showcase = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Project Showcase
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Exploring the intersection of AI and software engineering through modern web applications.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-md flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500">
                  <Code2 size={24} />
                </div>
                <span className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-zinc-400 border border-white/5">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tag, tIndex) => (
                  <span key={tIndex} className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={project.github} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm font-medium border border-white/5">
                  <Github size={18} /> Source
                </a>
                <a href={project.demo} className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all text-sm font-medium shadow-lg shadow-indigo-600/20">
                  <ExternalLink size={18} /> Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showcase;