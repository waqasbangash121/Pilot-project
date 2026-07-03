export type TeamMemberInput = {
  name: string;
  designation: string;
  quote: string;
  photoUrl: string;
  displayOrder: number;
};

export type TeamMemberRecord = TeamMemberInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
