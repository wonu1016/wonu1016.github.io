import { NOTION, SKILLS } from '../data.js';

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow reveal">/skills</div>
        <div className="skills-heading reveal d1">
          <h2 className="sec">기술 이름보다,<br /><em>할 수 있는 일</em>을 말합니다.</h2>
          <p>노션 포트폴리오의 기술 설명과 프로젝트에서 직접 맡은 작업을 기준으로 정리했습니다.</p>
        </div>
        <div className="skills-grid">
          {SKILLS.map((skill, index) => (
            <article className={`skill-card reveal${skill.featured ? ' skill-card-featured' : ''}`} key={skill.name}>
              <div className="skill-card-top">
                <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="skill-category">{skill.category}</span>
              </div>
              <h3>{skill.name}</h3>
              <p className="skill-summary">{skill.summary}</p>
              <ul className="skill-abilities">
                {skill.abilities.map(ability => <li key={ability}>{ability}</li>)}
              </ul>
              {skill.note && <p className="skill-note">{skill.note}</p>}
              {skill.source && <a className="skill-source" href={skill.source} target="_blank" rel="noopener noreferrer">노션 상세 설명 <span aria-hidden="true">↗</span></a>}
            </article>
          ))}
        </div>
        <div className="skills-foot reveal">
          <span>함께 사용한 도구</span>
          <p><b>Docker</b>로 실행·배포 환경을 구성하고, <b>Redis</b> 등 외부 인프라를 Spring Boot와 연동할 수 있습니다.</p>
          <a href={NOTION} target="_blank" rel="noopener noreferrer">전체 기술 기록 보기 ↗</a>
        </div>
      </div>
    </section>
  );
}
