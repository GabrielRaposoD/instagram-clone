import { useQuery } from 'react-query';
import { userService } from 'services';

const userStore = (userId: string) => {
  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(['/user', userId], () => userService.findOne(userId), {
    refetchInterval: 10000,
  });

  const { data: posts } = useQuery(
    ['/posts', userId],
    () => userService.findPosts(userId),
    {
      refetchInterval: 10000,
    }
  );

  return { isLoading, isError, error, user, posts };
};

export default userStore;
