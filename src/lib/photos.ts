/**
 * Verified Unsplash photo URLs. Each entry was checked via a HEAD-equivalent
 * fetch and visually confirmed before being committed. Format: a stable
 * Unsplash photo ID with format/fit/width/quality params.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const PHOTOS = {
  tennis: {
    src: unsplash("1622279457486-62dcc4a431d6"),
    alt: "Player in an orange shirt mid-forehand on a green hard court, late afternoon light.",
  },
  dice: {
    src: unsplash("1605870445919-838d190e8e1b"),
    alt: "Two white six-sided dice tumbling on a blue surface, motion just frozen.",
  },
  riskBoard: {
    src: unsplash("1606503153255-59d8b8b82176"),
    alt: "Plastic infantry pieces crowding the Africa territory on a Risk board.",
  },
  basketballHoop: {
    src: unsplash("1546519638-68e109498ffc"),
    alt: "Basketball dropping through the net, crowd blurred in the background.",
  },
  newspaperReader: {
    src: unsplash("1495020689067-958852a7765e"),
    alt: "Someone reading a printed broadsheet on a wooden bench, knees up.",
  },
  bookshelfTunnel: {
    src: unsplash("1532012197267-da84d127e765"),
    alt: "An open book hovering inside a Borges-shaped tunnel of bookshelves.",
  },
  filmReels: {
    src: unsplash("1542204165-65bf26472b9b"),
    alt: "Vintage 16mm film reels with tape unspooling onto a white surface.",
  },
  movieClapboard: {
    src: unsplash("1485846234645-a62644f84728"),
    alt: "A clapperboard for scene one, take nine, held up against a desert sky.",
  },
  golfSwing: {
    src: unsplash("1593766827228-8a8aa624a0d1"),
    alt: "Golfer just past impact at the tee, head cover at his feet, clouds piling up.",
  },
  cyclingPeloton: {
    src: unsplash("1517649763962-0c623066013b"),
    alt: "Tight peloton of road cyclists leaning into a corner on a country road.",
  },
  liftingFitness: {
    src: unsplash("1571019613454-1cb2f99b2d8b"),
    alt: "Athlete mid-crunch on a black mat in front of a sunlit gym window.",
  },
  starsMountains: {
    src: unsplash("1519681393784-d120267933ba"),
    alt: "Milky Way over a snow-capped mountain ridge, a single shooting star slashing right.",
  },
};
