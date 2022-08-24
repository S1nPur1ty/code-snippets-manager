import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@codiga/codiga-components';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Home from './pages/Home';
import FavoriteCookbooks from './pages/FavoriteCookbooks';
import FavoriteSnippets from './pages/FavoriteSnippets';
import MyCookbooks from './pages/MyCookbooks';
import MySnippets from './pages/MySnippets';
import TeamCookbooks from './pages/TeamCookbooks';
import TeamSnippets from './pages/TeamSnippets';

// STYLES
import './styles/reboot.css';
import './styles/fonts.css';
import './styles/app.css';

// OTHER
import client from './graphql/client';
import Layout from './components/Layout';
import Filters from './components/Filters/Filters';
import { UserProvider } from './components/UserContext';
import { ThemeProvider } from './components/ThemeContext';
import { FiltersProvider } from './components/FiltersContext';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <ThemeProvider>
            <Router>
              <Layout>
                <FiltersProvider>
                  <Filters />

                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/my-snippets" element={<MySnippets />} />
                    <Route
                      path="/favorite-snippets"
                      element={<FavoriteSnippets />}
                    />
                    <Route path="/my-cookbooks" element={<MyCookbooks />} />
                    <Route
                      path="/favorite-cookbooks"
                      element={<FavoriteCookbooks />}
                    />
                    <Route path="/team-snippets" element={<TeamSnippets />} />
                    <Route path="/team-cookbooks" element={<TeamCookbooks />} />
                  </Routes>
                </FiltersProvider>
              </Layout>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}