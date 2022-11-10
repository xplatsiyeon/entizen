import { isTokenGetApi } from 'api';
import { useQuery, useQueryClient } from 'react-query';

interface ProfileResponse {
  isSuccess: boolean;
  id: string;
  name: string;
  phone: string;
}
/**
 * 해당 훅은 유저 정보를 받아오는 훅이다
 * @param ACCESS_TOKEN : 로컬 스토리지에 있는 ACCESS_TOKEN을 인자로 받는다. 
 * @returns 
 *  profile -> 프로필 정보
    isLoading -> 로딩중
    invalidate -> 새로고침
    setProfileQuery
 */
const useProfile = (ACCESS_TOKEN: string) => {
  const queryClient = useQueryClient();

  const { data: profileResponse, isLoading } = useQuery<ProfileResponse>(
    ['getProfile', ACCESS_TOKEN],
    () => isTokenGetApi('/members/info'),
    {
      enabled: ACCESS_TOKEN ? true : false,
    },
  );

  const invalidate = () => {
    queryClient.invalidateQueries(['getProfile', ACCESS_TOKEN]);
  };

  const setProfileQuery = (targetProfile: string) => {
    queryClient.setQueryData(['getProfile', ACCESS_TOKEN], () => {
      return targetProfile;
    });
  };

  return {
    profile: profileResponse,
    isLoading,
    invalidate,
    setProfileQuery,
  };
};

export default useProfile;
