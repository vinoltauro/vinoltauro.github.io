import { MotionConfig } from 'motion/react'
import { sections, site } from './content'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { EducationList, Experience, ProjectList } from './components/Experience'
import { FoodPassport } from './components/FoodPassport'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { HowIWork } from './components/HowIWork'
import { Life } from './components/Life'
import { ProjectNav } from './components/ProjectNav'
import { Section } from './components/Section'
import { SkimToggle } from './components/SkimToggle'
import { Skills } from './components/Skills'
import { Spine } from './components/Spine'
import { TopBar } from './components/TopBar'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TopBar />
      <Spine />
      <div className="wrap">
        <main>
          <Hero />
          <Section {...sections.how}>
            <HowIWork chapters={site.chapters} />
          </Section>
          <Section {...sections.companies}>
            <Experience roles={site.companies} />
          </Section>
          <Section {...sections.projects}>
            <div className="projects-skim">
              <SkimToggle long />
            </div>
            <ProjectNav projects={site.projects} />
            <ProjectList projects={site.projects} />
          </Section>
          <Section {...sections.skills}>
            <Skills rows={site.skills} />
          </Section>
          <Section {...sections.education}>
            <EducationList entries={site.education} />
            <Achievements items={site.achievements} />
          </Section>
          <Section {...sections.life}>
            <p className="life-intro">{site.lifeIntro}</p>
            <Life items={site.life} />
            <FoodPassport />
            <Gallery />
          </Section>
          <Section {...sections.contact} className="contact">
            <Contact />
          </Section>
        </main>
        <footer className="site-footer">
          <span>{site.footer.left}</span>
          <span>{site.footer.right}</span>
        </footer>
      </div>
    </MotionConfig>
  )
}
