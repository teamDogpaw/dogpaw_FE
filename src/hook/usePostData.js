import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { postApis } from '../api/post';

export function useGetPost(postId) {
  return useQuery(
    'detailPost',
    () => {
      return postApis.getPostList(postId);
    },
    {
      cacheTime: 0,
    },
  );
}

export function useDeletePost() {
  return useMutation(postApis.deletePost);
}

export function useGetBookmarkRank() {
  return useQuery('bookmarkRank', postApis.getBookmarkRank);
}

export function usePostDeadline() {
  return useMutation(postApis.postDeadlineProject, {
    onError: () => {
      alert(
        '모집인원이 모두 찼을 경우 모집마감취소가 불가능합니다. \n모집인원을 늘리거나 팀원 조정이 필요합니다.',
      );
    },
  });
}

export function useGetKeepPostList() {
  return useInfiniteQuery(
    'postList',
    ({ pageParam = 0 }) => postApis.getKeepPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    },
  );
}
