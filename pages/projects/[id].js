import { useRouter } from 'next/router';
import Project from '../../components/paymaster/Project';
import axios from 'axios';

const ProjectPage = ({ project }) => {
  // If you need the project id client-side, you can use useRouter
  const router = useRouter();
  const { id } = router.query;

  return <Project project={project}/>;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`);
  return {
    props: {
      project: data,
    },
  };
}

export default ProjectPage;