import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import '../../styles/CenterPage/CenterPage.css';

// 해당 센터 회원들을 표출해주는 페이지

const CenterControl = (props) => {
  // const memberList = props.memberInfo
  // console.log('memberList=>', memberList);
  // const memberCount = 1;

  const [memberList, setMemberList] = useState({ list: [] });
  const [pageLink, setPageLink] = useState([]);

  var page_num = 1;
  const page_size = 7;
  var page_count = 1;
  var article_count = 0;
  const [articleCount,setArticleCount] = useState(0);

  const handlePage = (e) => {
    page_num = e.target.id;
    getMemberList();
  };

  async function getMemberList() {
    await axios.post("http://localhost:8008/membercount", {
      CENTER_ID: window.sessionStorage.getItem('centerID'),
    }).then((res) => {
      const { data } = res;
      article_count = data[0].COUNT;
      setArticleCount(data[0].COUNT);
      page_count = Math.ceil(article_count / page_size);
      var page_link = [];
      for (let i = 1; i <= page_count; i++) page_link.push(i);
      setPageLink(page_link);
    }).catch((e) => {
      console.error(e);
    });

    await axios.post("http://localhost:8008/memberlist", {
      page_num: page_num,
      page_size: page_size,
      article_count: article_count,
      CENTER_ID: window.sessionStorage.getItem('centerID'),
    }).then((res) => {
      const { data } = res;
      // console.log("memberlist(res)->", res);
      setMemberList({ list: data });
    }).catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    getMemberList();
  }, [])

  return (
    <div className='CenterPage_main'>
      <div className='CenterPage_InfoUpdate'>
        회원정보
        <br />
        (총 {articleCount}명 등록했습니다.)
      </div>
      <div className="CenterPage_UpdateBorder">
        <div className='CenterPage_infoName'>
          이름
        </div>
        <div className='CenterPage_infoAge'>
          나이
        </div>
        <div className='CenterPage_infoGender'>
          성별
        </div>
        <div className='CenterPage_infoTel'>
          전화번호
        </div>
        {
          memberList.list.map((ml) => (
            <div
              className='CenterPage_mainDiv'
              key={ml.USER_ID}
            >
              <div className='CenterPage_infoArticleName'>
                {ml.USER_NAME}
              </div>
              <div className='CenterPage_infoArticleAge'>
                {ml.USER_AGE}
              </div>
              <div className='CenterPage_infoArticleGender'>
                {ml.USER_SEX}
              </div>
              <div className='CenterPage_infoArticleTel'>
                {ml.USER_TEL}
              </div>
            </div>
          ))
        }
        <div class="CenterPage_page">
          {
            pageLink.map((page) => {
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
            props.setMode(0);
          }}
        />
      </div>
    </div>
  );
};

export default CenterControl;