import BookViewer from '../../components/features/BookViewer';

export const metadata = {
  title: 'Golden Easy English Translation - Interactive Book',
  description: 'Learn English translation with interactive lessons and vocabulary.',
};

export default function BookPage() {
  return (
    <main>
      <BookViewer />
    </main>
  );
}
