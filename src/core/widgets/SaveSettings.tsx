import React from 'react';
import styled from 'styled-components';
import exportFromJSON from 'export-from-json';
import {
  useActivities,
  useAwards,
  useEducation,
  useIntro,
  useReference,
  useSkills,
  useVolunteer,
  useWork,
} from 'src/stores/data.store';
import { getIcon } from 'src/styles/icons';
import axios from 'axios';

const IconWrapper = styled.div`
  outline-color: transparent;
  margin-bottom: 1rem;
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 40px;
  background: transparent;
  border: 0;
  border-radius: 2px;
  padding: 0;
  color: rgb(230, 230, 230);
`;

export function SaveSettings() {
  const basics = useIntro((state: any) => state.intro);
  const skills = useSkills((state: any) => state);
  const work = useWork((state: any) => state.companies);
  const education = useEducation((state: any) => state.education);
  const activities = useActivities((state: any) => state);
  const volunteer = useVolunteer((state: any) => state.volunteer);
  const references = useReference((state: any) => state.reference);
  const awards = useAwards((state: any) => state.awards);

  function save() {
    const data = {
      sprb_intro: localStorage.getItem('sprb-intro'),
      sprb_skills: localStorage.getItem('sprb-skills'),
      sprb_work: localStorage.getItem('sprb-work'),
      sprb_education: localStorage.getItem('sprb-education'),
      sprb_activities: localStorage.getItem('sprb-activities'),
      sprb_reference: localStorage.getItem('sprb-reference'),
      sprb_awards: localStorage.getItem('sprb-awards'),
      sprb_volunteer: localStorage.getItem('sprb-volunteer'),
      sprb_labels: localStorage.getItem('sprb-labels'),
    };
    axios.post('http://cms.test/saveresume', data).then(function (res) {
      console.log(res);
    });
    // const fileName = basics.name + '_' + new Date().toLocaleString();
    // const exportType = exportFromJSON.types.json;

    // exportFromJSON({
    //   data: { basics, skills, work, education, activities, volunteer, awards, references },
    //   fileName,
    //   exportType,
    // });
  }

  return (
    <IconWrapper>
      <IconButton onClick={save}>{getIcon('save')}</IconButton>
    </IconWrapper>
  );
}
