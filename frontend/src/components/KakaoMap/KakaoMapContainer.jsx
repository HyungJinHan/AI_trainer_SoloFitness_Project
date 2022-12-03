import React, { useEffect } from "react";
const { kakao } = window;

const KakaoMapContainer = ({ center_address }) => {
  useEffect(() => {
    const container = document.getElementById(`${center_address}`);
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Geocoder();

    // 키워드로 장소를 검색
    ps.addressSearch(`${center_address}`, addressSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function addressSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [center_address]);

  return (
    <div
      id={`${center_address}`}
      style={{
        width: "300px",
        height: "150px",
      }}
    ></div>
  );
};

export default KakaoMapContainer;