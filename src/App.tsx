import { Route, Routes, useLocation } from 'react-router-dom';
import { GlobalBoundary, Navbar } from '@/components';
import { routes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import TanstackProvider from './routes/TanstackProvider';

declare global {
  interface Window {
    Daum: any;
  }
}

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <TanstackProvider>
      <GlobalBoundary>
        <Routes location={state?.backgroundLocation || location}>
          {routes.map(({ Element, path, withNav, withAuth }) => {
            const element = withAuth ? (
              <ProtectedRoute path={path}>
                <Element />
              </ProtectedRoute>
            ) : (
              <Element />
            );
            if (withNav) {
              return (
                <Route key={path} path="/" element={<Navbar />}>
                  <Route path={path} element={element} />
                </Route>
              );
            }
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>

        {/* <Routes>
          <Route path="/info/:galleryId" element={<GalleryInfoPortal />} />
        </Routes> */}
      </GlobalBoundary>
    </TanstackProvider>
  );
}

export default App;
