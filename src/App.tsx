import { Route, Routes } from 'react-router-dom';
import {
  GalleryPage,
  EditUserInfoPage,
  LoginPage,
  MainPage,
  PostPage,
  ReviewPage,
  SignupPage,
  UserInfoPage,
  IntroPage,
} from '@/pages';
import { Navbar } from '@/components';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserInfoPage />} />
        <Route path="/user/:userId" element={<UserInfoPage />} />
        <Route path="/user/edit" element={<EditUserInfoPage />} />
        <Route path="/review/:galleryId" element={<ReviewPage />} />
        <Route path="/post" element={<PostPage />} />
      </Route>
      <Route path="/gallery/:galleryId" element={<GalleryPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
