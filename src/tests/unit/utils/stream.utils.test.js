const { limitStreams } = require('../../../utils/stream.utils');

describe('Stream utilities unit tests', () => {
  describe('empty session', () => {
    const session_streams = [];
    const [streams, error] = limitStreams(
      '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
      session_streams
    );

    it('Should not return error', () => {
      expect(error).toBe(null);
    });
    it('Should return array', () => {
      expect(Array.isArray(streams)).toBe(true);
    });
  });

  describe('session with one current stream (added less than 10s ago) - other than added one', () => {
    const session_streams = [
      {
        video_id: '75c4a8c5-0128-432d-b500-d049f59a2769',
        time: new Date(),
      },
    ];
    const [streams, error] = limitStreams(
      '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
      session_streams
    );

    it('Should not return error', () => {
      expect(error).toBe(null);
    });
    it('Should return array', () => {
      expect(Array.isArray(streams)).toBe(true);
    });
    it('Should return array of 2 current streams', () => {
      expect(streams.length).toBe(2);
    });
  });

  describe('session with one current stream (added less than 10s ago) - same than added one', () => {
    const stream_add_time = new Date();
    const session_streams = [
      {
        video_id: '75c4a8c5-0128-432d-b500-d049f59a2769',
        time: stream_add_time,
      },
    ];
    const [streams, error] = limitStreams(
      '75c4a8c5-0128-432d-b500-d049f59a2769',
      session_streams
    );

    it('Should not return error', () => {
      expect(error).toBe(null);
    });
    it('Should return array', () => {
      expect(Array.isArray(streams)).toBe(true);
    });
    it('Should return array of 1 current stream', () => {
      expect(streams.length).toBe(1);
    });
    it('Should update time in current stream', () => {
      expect(streams[0].time).not.toBe(stream_add_time);
    });
  });

  describe('session with 3 current stream (added less than 10s ago) - including added one', () => {
    const stream_add_time = new Date();
    const session_streams = [
      {
        video_id: '75c4a8c5-0128-432d-b500-d049f59a2769',
        time: stream_add_time,
      },
      {
        video_id: '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
        time: stream_add_time,
      },
      {
        video_id: '862c6229-abfd-47fb-961c-6734cf583646',
        time: stream_add_time,
      },
    ];
    const [streams, error] = limitStreams(
      '75c4a8c5-0128-432d-b500-d049f59a2769',
      session_streams
    );

    it('Should not return error', () => {
      expect(error).toBe(null);
    });
    it('Should return array', () => {
      expect(Array.isArray(streams)).toBe(true);
    });
    it('Should return array of 3 current stream', () => {
      expect(streams.length).toBe(3);
    });
    it('Should update time in current stream', () => {
      const updated_stream = streams.find(
        (s) => s.video_id === '75c4a8c5-0128-432d-b500-d049f59a2769'
      );
      expect(updated_stream.time).not.toBe(stream_add_time);
    });
  });

  describe('session with 3 current stream (added less than 10s ago) - not including added one', () => {
    const session_streams = [
      {
        video_id: '75c4a8c5-0128-432d-b500-d049f59a2769',
        time: new Date(),
      },
      {
        video_id: '96ccd833-6ecb-4a65-9f74-83dba6db22b1',
        time: new Date(),
      },
      {
        video_id: '862c6229-abfd-47fb-961c-6734cf583646',
        time: new Date(),
      },
    ];
    const [streams, error] = limitStreams(
      'e65a0162-1cd6-4ba8-8434-b597f160e5c8',
      session_streams
    );

    it('Should return error', () => {
      expect(error).not.toBe(null);
    });
    it('Should return empty array of streams', () => {
      expect(streams.length).toBe(0);
    });
  });
});
