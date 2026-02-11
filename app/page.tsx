import Hero from './components/sections/Hero';
import Bio from './components/sections/Bio';
import Skills from './components/sections/Skills';
import GitHubStats from './components/sections/GitHubStats';
import SpotifyEmbed from './components/sections/SpotifyEmbed';
// import MediumArticles from './components/sections/MediumArticles';

export default function Home() {
  return (
    <>
      <Hero />
      <Bio />
      <Skills />
      <GitHubStats />
      <SpotifyEmbed />
      {/* <MediumArticles /> */}
    </>
  );
}