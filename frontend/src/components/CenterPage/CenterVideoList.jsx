import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import '../../styles/CenterPage/CenterPage.css'
import CenterPageCount from './CenterPageCount';

function CenterVideoList(props) {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState({
    list: []
  });

  const [pageLink, setPageLink] = useState([]);

  var page_num = 1;
  const page_size = 4;
  var page_count = 1;
  var article_count = 0;
  const [articleCount, setArticleCount] = useState(0);

  const handlePage = (e) => {
    page_num = e.target.id;
    getVideoList();
  };

  async function getVideoList() {
    await axios
      .post("http://localhost:8008/videocount", {
        CT_VIDEO_WRITER: window.sessionStorage.getItem('centerID'),
      })
      .then((res) => {
        const { data } = res;
        setArticleCount(data[0].COUNT);
        article_count = data[0].COUNT
        page_count = Math.ceil(article_count / page_size);
        var page_link = [];
        for (let i = 1; i <= page_count; i++) page_link.push(i);
        setPageLink(page_link);
      })
      .catch((e) => {
        console.error(e);
      });

    await axios
      .post('http://localhost:8008/videolist', {
        page_num: page_num,
        page_size: page_size,
        CT_VIDEO_WRITER: window.sessionStorage.getItem('centerID')
      })
      .then((res) => {
        const { data } = res;
        setVideoList({
          list: data
        });
      })
      .catch((e) => {
        console.error(e);
      })
  }

  useEffect(() => {
    getVideoList();
  }, [])

  return (
    <div className='CenterPage_main'>
      <div className='CenterPage_InfoUpdate'>
        등록된 영상 목록
        <br />
        (총 {articleCount}개의 영상을 등록했습니다.)
      </div>
      <div className="CenterPage_UpdateBorder">
        {
          videoList.list
            .map((list) => (
              <div
                className='CenterPage_mainDiv'
              >
                <div
                  className='CenterPage_video'
                >
                  <ReactPlayer
                    className='CenterPage_video'
                    url={list.CT_VIDEO_ADDRESS}
                    controls
                    width={'40%'}
                    height={'20%'}
                  />
                  <div
                    className='CenterPage_text'
                    onClick={() => navigate(`/centerdetail?exec=${list.CT_VIDEO_TITLE}`)}
                  >
                    영상 제목 : {list.CT_VIDEO_TITLE}
                    <br />
                    영상 카테고리 : {list.CT_VIDEO_CATEGORY}
                  </div>
                </div>
              </div>
            ))
        }
        <div class="CenterPage_page">
          {
            pageLink
              .map((page) => {
                return (
                  <a id={page} onClick={handlePage}>
                    [{page}]
                  </a>
                );
              })
          }
        </div>
        <input
          className="CenterPage_button"
          type='button'
          value='돌아가기'
          onClick={() => {
            navigate('/centermain')
          }}
        />
      </div>
    </div >
  );
}

export default CenterVideoList;