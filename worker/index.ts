export default {
	async fetch(request, env, ctx) {
        const { searchParams } = new URL(request.url)
        let name = searchParams.get('name')
        try {
            const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${name}&api_key=${env.LASTFM_API_KEY}&format=json&limit=1`,
            );

            const data = await response.json();
            const track = data.recenttracks?.track;
            return Response.json(track);
        } catch (error) {
            console.error("Error fetching Last.fm data:", error);
            return Response.json({'error': error});
        }
	},
};