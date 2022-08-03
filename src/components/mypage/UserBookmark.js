import { useEffect, useState } from 'react';
import { usePostBookmark } from '../../hook/useUserData';
import { ReactComponent as BookmarkIcon } from '../../styles/icon/post/bookmark.svg';
import { ReactComponent as BookmarkFill } from '../../styles/icon/post/bookmarkFill.svg';

const UserBookmark = ({ postId, currentTab, bookmarkStatus }) => {
  const [isMyBookmark, setIsMyBookmark] = useState(true);

  useEffect(() => {}, [isMyBookmark]);

  const bookmark = () => {
    setIsMyBookmark((prev) => !prev);
    doBookmark(postId);
  };
  const { mutateAsync: doBookmark } = usePostBookmark();

  if (currentTab === 1) {
    return (
      <>
        {isMyBookmark ? (
          <BookmarkFill
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={bookmark}
          />
        ) : (
          <BookmarkIcon
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={bookmark}
          />
        )}
      </>
    );
  }
  if (currentTab === 4) {
    return null;
  }

  return (
    <>
      {bookmarkStatus ? (
        <BookmarkFill
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={bookmark}
        />
      ) : (
        <BookmarkIcon
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={bookmark}
        />
      )}
    </>
  );
};

export default UserBookmark;
