import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Re:hive Space" },
    { name: "description", content: "Learn more about Re:hive Space and our mission to share knowledge through technology." },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Re:hive Space
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A modern platform for sharing technology insights, tutorials, and industry knowledge.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Re:hive Space is dedicated to creating a collaborative environment where developers, 
                engineers, and technology enthusiasts can share knowledge, learn from each other, 
                and stay updated with the latest trends in the tech world.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that knowledge grows when shared, and our platform aims to be a 
                catalyst for learning and innovation in the technology community.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Cover</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Web Development & Modern Frameworks
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Cloud Technologies & DevOps
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Software Architecture & Best Practices
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Emerging Technologies & Trends
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Developer Tools & Productivity
                </li>
              </ul>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Built With Modern Tech</h2>
            <p className="text-gray-700 mb-6">
              This blog itself is built using cutting-edge technologies, serving as a 
              practical example of modern web development practices.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-gray-900">Frontend</h3>
                </div>
                <p className="text-sm text-gray-600">Remix + React + TailwindCSS</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-gray-900">Backend</h3>
                </div>
                <p className="text-sm text-gray-600">Directus + MySQL</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-gray-900">Deployment</h3>
                </div>
                <p className="text-sm text-gray-600">Docker + Railway</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
            <p className="mb-6">
              Have questions, suggestions, or want to contribute? We'd love to hear from you.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}