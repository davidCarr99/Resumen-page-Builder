import create from 'zustand';
import { arrayMoveImmutable } from 'array-move';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import userData from 'src/stores/data.json';
import axios from 'axios';

const labels = [
  'Experiencia',
  'Key Projects / Involvements',
  'Certificates and Awards',
  'Acerca de Mi',
  'Career Objective',
  'Technical Expertise',
  'Skills / Exposure',
  'Methodology / Approach',
  'Tools',
  'Education',
  'Relevant Experience',
  'Total Experience',
  'Referencias',
];

const fetch = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://cms.test/showresume')
      .then((response) => {
        if ('caches' in window) {
          caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((name) => {
              caches.delete(name);
            });
          });
        }

        const sprbIntro = JSON.parse(response.data['sprb-intro']);
        localStorage.setItem('sprb-intro', JSON.stringify(sprbIntro));

        const sprbSkills = JSON.parse(response.data['sprb-skills']);
        localStorage.setItem('sprb-skills', JSON.stringify(sprbSkills));

        const sprbWork = JSON.parse(response.data['sprb-work']);
        localStorage.setItem('sprb-work', JSON.stringify(sprbWork));

        const sprbEducation = JSON.parse(response.data['sprb-education']);
        localStorage.setItem('sprb-education', JSON.stringify(sprbEducation));

        const sprbActivities = JSON.parse(response.data['sprb-activities']);
        localStorage.setItem('sprb-activities', JSON.stringify(sprbActivities));

        const sprbReference = JSON.parse(response.data['sprb-reference']);
        localStorage.setItem('sprb-reference', JSON.stringify(sprbReference));

        const sprbAwards = JSON.parse(response.data['sprb-awards']);
        localStorage.setItem('sprb-awards', JSON.stringify(sprbAwards));

        const sprbVolunteer = JSON.parse(response.data['sprb-volunteer']);
        localStorage.setItem('sprb-volunteer', JSON.stringify(sprbVolunteer));

        localStorage.setItem('sprb-labels', JSON.stringify(response.data['sprb-labels']));

        // const sprbIntro = JSON.parse(localStorage.getItem('sprb-intro')!);

        console.log(localStorage.getItem('sprb-intro'));
        // console.log(response)
        const sprb = {
          basics: {
            name: sprbIntro.state.intro.name,
            label: sprbIntro.state.intro.label,
            image: sprbIntro.state.intro.image,
            email: sprbIntro.state.intro.email,
            phone: sprbIntro.state.intro.phone,
            url: sprbIntro.state.intro.url,
            summary: sprbIntro.state.intro.summary,
            location: {
              address: sprbIntro.state.intro.location.address,
              postalCode: sprbIntro.state.intro.location.postalCode,
              city: sprbIntro.state.intro.location.city,
              countryCode: sprbIntro.state.intro.location.countryCode,
              region: sprbIntro.state.intro.location.region,
            },
            totalExp: sprbIntro.state.intro.totalExp,
            objective: sprbIntro.state.intro.objective,
            profiles: [
              {
                network: sprbIntro.state.intro.profiles[0].network,
                username: sprbIntro.state.intro.profiles[0].username,
                url: sprbIntro.state.intro.profiles[0].url,
              },
            ],
          },
          skills: {
            languages: [
              {
                name: sprbSkills.state.languages[0].name,
                level: sprbSkills.state.languages[0].level,
              },
            ],
            frameworks: [
              {
                name: sprbSkills.state.frameworks[0].name,
                level: sprbSkills.state.frameworks[0].level,
              },
            ],
            technologies: [
              {
                name: sprbSkills.state.technologies[0].name,
                level: sprbSkills.state.technologies[0].level,
              },
            ],
            libraries: [
              {
                name: sprbSkills.state.libraries[0].name,
                level: sprbSkills.state.libraries[0].level,
              },
            ],
            databases: [
              {
                name: sprbSkills.state.databases[0].name,
                level: sprbSkills.state.databases[0].level,
              },
            ],
            practices: [
              {
                name: sprbSkills.state.practices[0].name,
                level: sprbSkills.state.practices[0].level,
              },
            ],
            tools: [
              {
                name: sprbSkills.state.tools[0].name,
                level: sprbSkills.state.tools[0].level,
              },
            ],
          },
          work: [
            {
              name: sprbWork.state.companies[0].name,
              position: sprbWork.state.companies[0].position,
              url: sprbWork.state.companies[0].url,
              startDate: sprbWork.state.companies[0].startDate,
              endDate: sprbWork.state.companies[0].endDate,
              years: sprbWork.state.companies[0].years,
              highlights: sprbWork.state.companies[0].highlights,
              summary: sprbWork.state.companies[0].summary,
            },
          ],
          education: [
            {
              institution: sprbEducation.state.education[0].institution,
              url: sprbEducation.state.education[0].url,
              studyType: sprbEducation.state.education[0].studyType,
              area: sprbEducation.state.education[0].area,
              startDate: sprbEducation.state.education[0].startDate,
              endDate: sprbEducation.state.education[0].endDate,
              score: sprbEducation.state.education[0].score,
              courses: sprbEducation.state.education[0].courses,
            },
          ],
          activities: {
            involvements: sprbActivities.state.involvements,
            achievements: sprbActivities.state.achievements,
          },
          reference: [
            {
              ref: sprbReference.state.references[0].ref,
              name: sprbReference.state.references[0].name,
              phone: sprbReference.state.references[0].phone,
              info: sprbReference.state.references[0].info,
            },
          ],
          volunteer: [],
          awards: [],
        };
        resolve(sprb);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const useIntro = create(
  persist(
    (set) => ({
      intro: userData.basics,

      getIntro: fetch()
        .then((res: any) => set({ intro: res.basics }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.basics) => {
        set({ intro: data });
      },

      update: (type: string, value: string) =>
        set(
          produce((state: any) => {
            if (type.includes('.')) {
              const [parent, child] = type.split('.');
              state.intro[parent][child] = value;
            } else state.intro[type] = value;
          })
        ),

      updateProfiles: (type: string, field: string, value: string) =>
        set(
          produce((state: any) => {
            const object = state.intro.profiles.find((profile) => profile.network === type);

            if (object) {
              object[field] = value;
              return;
            }

            state.intro.profiles.push({ network: type, [field]: value });
          })
        ),
    }),
    {
      name: 'sprb-intro',
    }
  )
);

export const useSkills = create(
  persist(
    (set) => ({
      languages: userData.skills.languages,
      frameworks: userData.skills.frameworks,
      libraries: userData.skills.libraries,
      databases: userData.skills.databases,
      technologies: userData.skills.technologies,
      practices: userData.skills.practices,
      tools: userData.skills.tools,

      getSkills: fetch()
        .then((res: any) =>
          set({
            languages: res.skills.languages,
            frameworks: res.skills.frameworks,
            libraries: res.skills.libraries,
            databases: res.skills.databases,
            technologies: res.skills.technologies,
            practices: res.skills.practices,
            tools: res.skills.tools,
          })
        )
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.skills) => {
        set({
          languages: data.languages,
          frameworks: data.frameworks,
          libraries: data.libraries,
          databases: data.databases,
          technologies: data.technologies,
          practices: data.practices,
          tools: data.tools,
        });
      },

      add: (type: string, name = '', level = 1) =>
        set((state: any) => {
          if (state[type].some((skill) => skill.name === '')) return;

          state[type] = [...state[type]];
          state[type].push({ name, level });
        }),

      update: (type: string, index: number, key: 'name' | 'level', value: string | number) =>
        set((state: any) => {
          state[type] = [...state[type]];
          state[type][index][key] = value;
        }),

      purge: (type: string, index: number) =>
        set((state: any) => {
          state[type] = state[type].filter((_, ind) => index !== ind);
        }),

      changeOrder: (type: string, oldIndex: number, newIndex: number) =>
        set((state: any) => ({
          ...state,
          [type]: arrayMoveImmutable(state[type], oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-skills',
    }
  )
);

export const useWork = create(
  persist(
    (set) => ({
      companies: userData.work,

      getWork: fetch()
        .then((res: any) => set({ companies: res.work }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.work) => {
        set({ companies: data });
      },

      setField: (event: InputEvent) =>
        set((state: any) => {
          const field = event.target?.['dataset']?.label;

          if (field === undefined) return;
          state[field] = event.target?.['value'];
        }),

      add: () =>
        set((state: any) => ({
          companies: [
            ...state.companies,
            {
              name: 'Company',
              role: '',
              from: '',
              to: '',
              years: '',
              description: '* Point 1\n* Point 2',
            },
          ],
        })),

      update: (index, field, value) =>
        set((state: any) => {
          const newCompnaies = [...state.companies];
          newCompnaies[index][field] = value;

          return {
            companies: newCompnaies,
          };
        }),

      purge: (index: number) =>
        set((state: any) => ({
          companies: state.companies.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          companies: arrayMoveImmutable(state.companies, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-work',
    }
  )
);

export const useEducation = create(
  persist(
    (set) => ({
      education: userData.education,

      geteducation: fetch()
        .then((res: any) => set({ education: res.education }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.education) => {
        set({ education: data });
      },

      add: () =>
        set((state: any) => ({
          education: [
            ...state.education,
            {
              institution: '',
              url: '',
              studyType: 'Degree',
              area: '',
              startDate: '',
              endDate: '',
              score: '',
              courses: [],
            },
          ],
        })),

      update: (index, field, value) =>
        set((state: any) => {
          const newEducation = [...state.education];
          newEducation[index][field] = value;
          return {
            education: newEducation,
          };
        }),

      purge: (index: number) =>
        set((state: any) => ({ education: state.education.filter((_, ind) => ind !== index) })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          education: arrayMoveImmutable(state.education, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-education',
    }
  )
);

export const useActivities = create(
  persist(
    (set) => ({
      involvements: userData.activities.involvements,
      achievements: userData.activities.achievements,

      getinvolvements: fetch()
        .then((res: any) => set({ involvements: res.activities.involvements }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      getachievements: fetch()
        .then((res: any) => set({ involvements: res.activities.achievements }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.activities) => {
        set({
          involvements: data.involvements,
          achievements: data.achievements,
        });
      },

      update: (type: string, value: string | number) =>
        set((state: any) => {
          state[type] = value;
        }),
    }),
    {
      name: 'sprb-activities',
    }
  )
);

export const useVolunteer = create(
  persist(
    (set) => ({
      volunteer: userData.volunteer,

      getvolunteer: fetch()
        .then((res: any) => set({ volunteer: res.volunteer }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      add: () =>
        set(
          produce((state: any) => {
            state.volunteer.push({
              organization: 'Organization',
              position: 'Volunteer',
              url: '',
              startDate: '',
              endDate: '',
              summary: '',
              highlights: '',
            });
          })
        ),

      update: (index: string, key: string, value: string) =>
        set(
          produce((state: any) => {
            state.volunteer[index][key] = value;
          })
        ),

      purge: (index: number) =>
        set((state: any) => ({
          volunteer: state.volunteer.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          volunteer: arrayMoveImmutable(state.volunteer, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-volunteer',
    }
  )
);

export const useAwards = create(
  persist(
    (set) => ({
      awards: userData.awards,

      getawards: fetch()
        .then((res: any) => set({ awards: res.awards }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      add: () =>
        set(
          produce((state: any) => {
            state.awards.push({
              title: 'Award X',
              date: '',
              awarder: '',
              summary: '',
            });
          })
        ),

      update: (index: string, key: string, value: string) =>
        set(
          produce((state: any) => {
            state.awards[index][key] = value;
          })
        ),

      purge: (index: number) =>
        set((state: any) => ({
          awards: state.awards.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          awards: arrayMoveImmutable(state.awards, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-awards',
    }
  )
);

export const useLabels = create(
  persist(
    (set) => ({
      labels,

      update: (index: number, value: string) =>
        set((state: any) => {
          const newlabels = [...state.labels];
          newlabels[index] = value;
          return {
            labels: newlabels,
          };
        }),
    }),
    {
      name: 'sprb-labels',
    }
  )
);

export const useReference = create(
  persist(
    (set) => ({
      references: userData.reference,

      getreferences: fetch()
        .then((res: any) => set({ references: res.reference }))
        .catch((error) => {
          console.log('ERROR:', error);
        }),

      reset: (data = userData.reference) => {
        set({ references: data });
      },

      setField: (event: InputEvent) =>
        set((state: any) => {
          const field = event.target?.['dataset']?.label;

          if (field === undefined) return;
          state[field] = event.target?.['value'];
        }),

      add: () =>
        set((state: any) => ({
          references: [
            ...state.references,
            {
              ref: 'Referencia',
              name: '',
              phone: '',
              info: '',
            },
          ],
        })),

      update: (index, field, value) =>
        set((state: any) => {
          const newReferences = [...state.references];
          newReferences[index][field] = value;
          console.log(state.references);
          return {
            references: newReferences,
          };
        }),

      purge: (index: number) =>
        set((state: any) => ({
          references: state.references.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          references: arrayMoveImmutable(state.references, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-reference',
    }
  )
);
