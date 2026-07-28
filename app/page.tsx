"use client";

import { MotionConfig } from "framer-motion";
import { Certificates } from "@/components/sections/certificates";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Gallery } from "@/components/sections/gallery";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Profile } from "@/components/sections/profile";
import { Projects } from "@/components/sections/projects";
import { Sidebar } from "@/components/sections/sidebar";
import { SocialLinks } from "@/components/sections/social-links";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Sidebar />
      <main className="min-h-screen bg-white text-black lg:ml-16">
        <Navbar />
        <Hero />

        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Profile />
          <Projects />
          <TechStack />

          <div className="border-t border-black py-10 md:py-16">
            <Experience />
          </div>

          <GitHubActivity />
          <Certificates />
          <Gallery />
          <SocialLinks />
        </div>

        <Footer />
      </main>
    </MotionConfig>
  );
}
