exports.limitStreams = (video_id, streams) => {
  const stream = { video_id, time: new Date() };

  if (streams) {
    const updateStream = streams.map((s) => s.video_id).includes(video_id);
    const buffTime = 1000 * 20;

    const filtered_streams = streams.filter(
      (s) => new Date() - new Date(s.time) < buffTime
    );

    if (filtered_streams.length >= 3 && !updateStream) {
      return [
        [],
        {
          error: true,
          msg: `User exceeded max number of streams watched at the same time (3).`,
        },
      ];
    }

    const res_streams = updateStream
      ? filtered_streams.map((s) =>
          s.video_id === video_id ? { video_id, time: new Date() } : s
        )
      : [...filtered_streams, stream];

    return [res_streams, null];
  } else {
    return [[stream], null];
  }
};
