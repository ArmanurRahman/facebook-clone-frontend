interface Props {
    post: Post;
}

const Post: React.FC<Props> = ({ post }) => {
    return <div className='post_box'>{post._id}</div>;
};
export default Post;
