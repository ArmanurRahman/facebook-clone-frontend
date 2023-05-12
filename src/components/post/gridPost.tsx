const GridPost = () => {
    return (
        <div className='grid_post_container'>
            <div className='grid_post_header'>
                <p>Posts</p>
                <div className='grid_post_header_right'>
                    <div className='grid_post_header_right_gray_btn'>
                        <i className='equalize_icon'></i>
                    </div>
                    <div className='grid_post_header_right_gray_btn'>
                        <i className='manage_icon'></i>
                        Manage Posts
                    </div>
                </div>
            </div>
            <div className='devider'></div>
            <div className='grid_post_body'>
                <div className='view_grid'>
                    <i className='list_icon'></i>
                    List view
                </div>
                <div className='view_grid'>
                    <i className='grid_icon'></i>
                    Grid view
                </div>
            </div>
        </div>
    );
};

export default GridPost;
