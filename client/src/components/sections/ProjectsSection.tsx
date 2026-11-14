import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/types";
import { ProjectCard } from "../ProjectCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#fbf8f0,#f7f3e9)] py-20 sm:py-24">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Réalisations"
              title={
                <>
                  Des ouvrages qui{" "}
                  <em className="serif-accent text-jade-dark">
                    changent d'échelle.
                  </em>
                </>
              }
              description="Routes, ponts, bâtiments et réseaux : découvrez comment nos équipes transforment les études en infrastructures utiles."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Button
              to="/realisations"
              variant="outline"
              icon={<ArrowUpRight className="size-4" />}
            >
              Voir toutes les réalisations
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 space-y-10">
          {projects.length > 0 ? (
            <Reveal>
              <ProjectCard project={projects[0]} large />
            </Reveal>
          ) : null}

          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(1, 4).map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
