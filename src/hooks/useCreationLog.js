import { useQuery } from '@tanstack/react-query';
import myGalleryService from '@/libs/service/myGalleryService';

const useCreationLog = () => {
  return useQuery({
    queryKey: ['creationLog'],
    queryFn: myGalleryService.getCreationLog,
  });
};

export default useCreationLog;
