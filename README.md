![header](https://capsule-render.vercel.app/api?type=waving&color=7EC9FF&height=250&section=header&text=중소벤처기업부%20벤처스타트업%20아카데미%20사업%20우수상&fontSize=32&animation=fadeIn&fontAlignY=32&desc=2023%20동국대학교%20웹%20개발자%20양성%20장학%20과정&descAlignY=51&descAlign=70)

# **내 손 안의 작은 전시회 플랫폼, _Esthète_**

<div align="left">

### Tech Stack

**FE**

<img src="https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white">

**UX·UI**

<img src="https://img.shields.io/badge/Figma-ae4dff?style=for-the-badge&logo=figma&logoColor=white">

**BE**

<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white">

**Infra**

<img src="https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white">
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
<img src="https://img.shields.io/badge/Jenkins-6D6B6D?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/ArgoCD-F27300?style=for-the-badge&logo=argo&logoColor=white">
<img src="https://img.shields.io/badge/Helm%20Chart-277A9F?style=for-the-badge&logo=helm&logoColor=white">

**CO-WORK**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)](https://www.atlassian.com/software/jira)
[![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/)

</div>

<br/>

<hr/>

- **Why, 온라인 전시회 플랫폼?**
  ```
  - 사진 저작권 침해, 휘발성 강한 SNS에 대한 불만
  - 누구나 보호받을 수 있는 모바일 전시회 플랫폼
  ```

<hr/>

- **제안**

  > 1.  포트폴리오 기능
  > 2.  작품 의도 전달
  > 3.  전시 체류 시간 증진 필요
  > 4.  저작권 보호
  > 5.  유해 컨텐츠 필터링
  > 6.  위치 기반 사진 검색

- **해결 방안**
  > 1.  전시 PDF 추출 기능
  > 2.  방 단위 전시 공간 분리
  > 3.  Cube Animation 이용 전시 이동 자동 스크롤 5초
  > 4.  MD5 해시 생성 체크섬 DB 저장
  > 5.  Google Cloud Vision API Safe Search
  > 6.  Google map Geocoding API 클러스터링
  > 7.  판매자를 위한 통계 제공
  >     - Chart.js 라이브러리 활용 데이터 시각화
  >     - Redis 활용 통계 등록 중복 방지 구현

---

### CMS Mobile 화면

> 전시 추천 피드

<table>
  <tr>
    <td rowspan="7" align="center"><img src="./images/추천.png" alt="추천" /></td>
  </tr>
  <tr>
    <td> <b>스케줄러 캐싱</td>
  </tr>
  <tr>
  <td align="center"><img src="./images/스케줄러캐싱.png" alt="스케쥴러캐싱" /></td>
  </tr>
  <tr>
  <td> <b>전시 추천 API 호출 시 </td>
  </tr>
  <tr>
  <td align="center"><img src="./images/전시추천API호출시.png" alt="전시추천API호출시" /></td>
  </tr>
  <tr>
  <td> <b>전시 UX 설계 - 체류시간 극대화 및 PDF 다운로드 </td>
  </tr>
  <tr>
  <td> - 전시관에 머무르는 시간 극대화를 위해 상하 스크롤이 아닌 5초마다 자동으로 스크롤 되도록 구성 </br>
  - 본인 전시의 경우 PDF로 다운로드 받아 사진 작가 포트폴리오로 활용가능
 </td>
  </tr>
</table>

> 저작권 필터링

<table>
  <tr>
    <td rowspan="5" align="center"><img src="./images/저작권필터.png" /></td>
  </tr>
  <tr>
    <td> <b>사진 업로드 완료 후</td>
  </tr>
  <tr>
  <td align="center"><img src="./images/사진업로드완료후.png" /></td>
  </tr>
  <tr>
  <td> <b>사진 업로드 진행 전 </td>
  </tr>
  <tr>
  <td align="center"><img src="./images/사진업로드진행전.png" /></td>
  </tr>
</table>

> 유해성 필터링

<table>
  <tr>
    <td rowspan="5" align="center"><img src="./images/유해성필터.png"  /></td>
  </tr>
  <tr>
    <td> <b>Google Cloud Vision API Safe Search API 활용</td>
  </tr>
  <tr>
  <td align="center"><img src="./images/VisionAPISafeSearch활용.png" /></td>
  </tr>

</table>

> LightMap

<table>
  <tr>
    <td rowspan="5" align="center"><img src="./images/LightMap.png" /></td>
  </tr>
  <tr>
    <td> <b>위치 정보 정규화 저장</td>
  </tr>
  <tr>
  <td align="center"><img src="./images/%EC%9C%84%EC%B9%98%EC%A0%95%EB%B3%B4%EC%A0%95%EA%B7%9C%ED%99%94%EC%A0%80%EC%9E%A5.png"/></td>
  </tr>
  <tr>
  <td> <b>SQL GROUP BY문 활용 위치 정보 기반 클러스터링 </td>
  </tr>
  <tr>
  <td align="center"><img src="./images/위치정보기반클러스터링.png"/> </td>
  </tr>
</table>

---

### CMS WEB UI 디자인

https://github.com/dgu-web-t3-blackshoe/esthete-cms/assets/102159721/60060860-f86f-4765-bcb2-6ace3d67fa25

https://github.com/dgu-web-t3-blackshoe/esthete-cms/assets/102159721/bc752696-35e7-4747-ac58-ed881cc494b4

https://github.com/dgu-web-t3-blackshoe/esthete-cms/assets/102159721/71fe9dad-3b49-48e1-80d0-2dd02779dc9e

https://github.com/dgu-web-t3-blackshoe/esthete-cms/assets/102159721/581e63e0-e6da-458f-a78e-073a36c7fce9

<hr/>

### 시스템 아키텍처

![아키텍처 추상화](./images/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98%20%EC%B6%94%EC%83%81%ED%99%94.png)

### GKE 아키텍처

![image](https://github.com/dgu-web-t3-blackshoe/esthete-cms/assets/102159721/e8d12935-6408-41f9-8b9c-ef7528d5d3ee)

### CICD 파이프라인

![CICD](./images/CICD.png)

<hr/>

### 배포 링크

> https://esthete-cms.vercel.app/

### 유튜브 시연

> https://www.youtube.com/watch?v=B-3IrsyK8B4&list=WL&index=1

### DEV 정리

> https://asheroh.notion.site/Esth-te-039ce99aba8f430b83e14eb66994ab7f
