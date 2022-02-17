import { useQuery } from 'react-query';
import { userService } from 'services';

const feedStore = (userId: any) => {
  const { data: feed } = useQuery(
    ['/feed', userId],
    () => userService.getFeed(userId),
    {
      refetchInterval: 10000,
    }
  );

  return { feed };
};

export default feedStore;
