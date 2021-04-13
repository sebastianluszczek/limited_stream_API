// dummy data
const VIDEOS = [
  {
    id: '75c4a8c5-0128-432d-b500-d049f59a2769',
    name: 'Video 1',
  },
  {
    id: '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
    name: 'Video 2',
  },
  {
    id: '862c6229-abfd-47fb-961c-6734cf583646',
    name: 'Video 3',
  },
  {
    id: 'e65a0162-1cd6-4ba8-8434-b597f160e5c8',
    name: 'Video 4',
  },
];

exports.getAllVideos = () => {
  return [...VIDEOS]
}

exports.getOneVideo = (videoId) => {
  return VIDEOS.find(v => v.id === videoId);
}