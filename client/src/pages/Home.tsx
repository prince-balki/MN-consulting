import { useEffect, useState } from "react";
import {
  fallbackProjects,
  fallbackServices,
  fallbackTestimonials,
} from "../data/fallback";
import { getProjectsSafe, getServicesSafe, getTestimonialsSafe } from "../lib/api";
import { useSeo } from "../lib/seo";
import type { Project, Service, Testimonial } from "../lib/types";
import { AboutSection } from "../components/sections/AboutSection";
import { CtaSection } from "../components/sections/CtaSection";
import { Hero } from "../components/sections/Hero";
import { ProcessSection } from "../components/sections/ProcessSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { StatsSection } from "../components/sections/StatsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { TrustBar } from "../components/sections/TrustBar";

export default function Home() {
  useSeo();

  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [projects, setProjects] = useState<Project[]>(
    fallbackProjects.filter((project) => project.featured),
  );
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    let active = true;

    Promise.all([
      getServicesSafe(),
      getProjectsSafe({ featured: true, limit: 4 }),
      getTestimonialsSafe(),
    ]).then(([serviceList, projectList, testimonialList]) => {
      if (!active) return;
      if (serviceList.length) setServices(serviceList);
      if (projectList.length) setProjects(projectList);
      if (testimonialList.length) setTestimonials(testimonialList);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection services={services} />
      <AboutSection />
      <ProcessSection />
      <ProjectsSection projects={projects} />
      <StatsSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}
