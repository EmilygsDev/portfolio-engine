
export interface Technology {
  id: string;
  name: string;
  icon: string;
  color: string;
  phase: string;
}

export interface Phase {
  id: string;
  name: string;
//  desc: string;
}


export interface Project {
  id: number;
  title: string;
  desc: string;
  techIds: string[];
  link?: string;
}

