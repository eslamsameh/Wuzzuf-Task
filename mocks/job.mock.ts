export const jobMockedData = {
  id: '9b92abe6-3bf3-4cc6-8744-4de0c8af0630',
  type: 'job',
  attributes: { title: 'Engineering Manager' },
  relationships: {
    skills: [
      {
        id: 'f4a6f053-2cac-44fc-a87a-5368d7ca46ed',
        type: 'skill',
        attributes: { name: 'JavaScript', type: 'Knowledge', importance: '3.7', level: '2.3' },
      },
      {
        id: 'f4a6f053-2cac-44fc-a87a-5368d7ca46ed',
        type: 'skill',
        attributes: { name: 'JavaScript', type: 'Knowledge', importance: '3.7', level: '2.3' },
      },
      {
        id: 'f4a6f053-2cac-44fc-a87a-5368d7ca46ed',
        type: 'skill',
        attributes: { name: 'JavaScript', type: 'Knowledge', importance: '3.7', level: '2.3' },
      },
    ],
    jobs: [
      {
        id: '9b92abe6-3bf3-4cc6-8744-4de0c8af0630',
        type: 'job',
        attributes: { title: 'Engineering Manager' },
      },
    ],
  },
} as JobObject;
