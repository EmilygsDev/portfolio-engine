
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly techStack = [

    { id: 'python', name: 'Python', icon: 'icons/python.svg', color: '#3776ab', phase: 'implementation' },
    { id: 'typescript', name:'Typescript', icon:'icons/typescript.svg', color: '#3178C6', phase: 'implementation' },
    { id: 'rust', name: 'Rust', icon: 'icons/rust.svg', color: '#ce412b', phase: 'implementation' },
    { id: 'java', name: 'Java', icon:'icons/java.svg', color: '#FF0000', phase: 'implementation' },
    //{ id: 'oracle', name: 'Oracle', icon:'icons/oracle.svg', color: '#D32F2F', phase: 'deployment'},
    { id: 'apachemaven', name: 'Maven', icon: 'icons/apachemaven.svg', color: '#634533', phase: 'implementation' },
    { id: 'docker', name: 'Docker', icon: 'icons/docker.svg', color: '#2496ed', phase: 'deployment' },
    //{ id: 'sqlite', name:'Sqlite', icon:'icons/sqlite.svg', color: '#044a64', phase: 'maintenance' },
    //{ id: 'apachekafka', name:'Kafka', icon:'icons/apachekafka.svg', color: '#000000', phase: 'deployment'},
    { id: 'postgresql', name: 'PostgreSQL', icon: 'icons/postgresql.svg', color: '#336791', phase: 'implementation' }
  ];

 private readonly projects = [
   {
     id: 1,
     title: 'Secure cloud vault',
     desc: 'Sistema de almacenamiento cifrado que utiliza Rust para el core y PostgreSQL para metadatos.',
     techIds: ['rust', 'postgresql', 'docker'],
     link: '#'
   },
   {
     id: 2,
     title: 'Data sentinel API',
     desc: 'API de alto rendimiento procesando flujos de datos masivos en Python.',
     techIds: ['python', 'docker'],
     link: '#'
   },
   {
     id: 3,
     title: 'System auditor',
     desc: 'Herramienta de bajo nivel para auditoría de procesos en Linux.',
     techIds: ['rust', 'typescript'],
     link: '#'
   }
 ];

 getProjectsByTech(techId: string) {
   return this.projects.filter(p => p.techIds.includes(techId));
 }

  getTechnologies() {
    return this.techStack;
  }

  getTechsForPhase(phaseId: string) {
      if (phaseId === 'all') {
        return [...this.techStack];
      }
      return this.techStack.filter(t => t.phase === phaseId);
    }

    getProjectsByPhase(phaseId: string) {
      if (phaseId === 'all') {
        return [...this.projects];
        }

      const validIds = new Set(this.getTechsForPhase(phaseId).map(t => t.id));

      return this.projects.filter(p =>
        p.techIds.some(id => validIds.has(id))
      );
    }

}
