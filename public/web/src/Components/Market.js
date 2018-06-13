import React, { Component } from 'react';


class Resume extends Component {
  render() {
    if(this.props.data){
     var offering = this.props.data.offerings.map(function(off){
       return <div key={off.solution} className="row item">
          <div className="twelve columns">
             <h3>{off.solution}</h3>
             <p className="info">{off.subtitle} <span>&bull;</span> <em className="date">{off.date}</em></p>
             <p>
               {off.description}
             </p>
          </div>
       </div>
     });

     var skills = this.props.data.skills.map(function(skill){
       var className = 'bar-expand '+skill.name.toLowerCase();
       return <li key={skill.name}><span style={{width:skill.level}} className={className}></span><em>{skill.name}</em></li>
     });
   }
    return (
      <section id="resume">

   <div className="row education">
      <div className="three columns header-col">
         <h1><span>Solutions</span></h1><br />
      </div>
        {offering}
   </div>   
   <div className="row skill">
      <div className="three columns header-col">
         <h1><span>Agent Skills</span></h1>
      </div>
      <div className="nine columns main-col">

         <p>Some of the more popular agent skills include sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
         eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
         voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
         voluptatem sequi nesciunt.
         </p>

     <div className="bars">

        <ul className="skills">
          {skills}
       </ul>

     </div>

   </div>

   </div>

</section>
    );
  }
}

export default Resume;
