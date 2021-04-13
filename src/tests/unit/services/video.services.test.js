const {getAllVideos, getOneVideo} = require('../../../services/video.services');

describe('Video services unit tests', () => {

  describe('getAllVideos', () => {
    const [videos, error] = getAllVideos()

    it('Should get response', () => {
      expect(videos).toBeDefined();
    });
    it('Should return array', () => {
      expect(Array.isArray(videos)).toBe(true);
    });
    it('Should get all (4) videos', () => {
      expect(videos.length).toBe(4);
    });
  });

  describe('getOneVideo', () => {
    const video_id = "75c4a8c5-0128-432d-b500-d049f59a2769"

    it('Should get response for valid video ID', () => {
      const [video, _] = getOneVideo(video_id)
      expect(video).toBeDefined();
    });
    it('Should not return error for valid video ID', () => {
      const [_, error] = getOneVideo(video_id)
      expect(error).toBe(null);
    });
    it(`Should return element with correct id`, () => {
      const [video, _] = getOneVideo(video_id)
      expect(video.id).toBe(video_id);
    });
    it(`Should return undefined with incorrect id`, () => {
      const [video, _] = getOneVideo("abc")
      expect(video).toBe(undefined);
    });
    it(`Should return error without id provided`, () => {
      const [_, error] = getOneVideo()
      expect(error).not.toBe(null)
    });
  });
});