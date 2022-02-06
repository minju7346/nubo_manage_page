# NUBO 앱 관리 페이지
> 간략한 프로젝트 소개 문구를 작성합니다.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

해당 프로젝트는 (주)다우데이타에서 인턴기간동안 진행하였으며, 모바일 가상화 플랫폼인 'NUBO'앱 관리페이지입니다.
(2021.01~2021.08, 8개월)

![](readme_img/main.png)
< main.html >
## 1. 프로젝트 개요

**제작배경 **
- Nubo 웹페이지 보완 필요, 파일 관리 페이지 부재

**제작목적 **
- Nubo 기본 웹페이지 생성 및 파트너사 웹페이지 관리
- 파일 관리 용이성 증대

**기대효과 **
- Nubo 제품에 대한 기본 웹사이트 보유 및 관리 간편화

**기능요약 **
- 파트너사 웹페이지 통합관리 및 앱 파일 관리

**요구사항**
- Android용 apk 및 iOS용 ipa 파일 다운로드 페이지 구현
- 앱파일 CRUD기능 구현
- 다양한 버전 관리(Prod, Wifi 등)
- 버전 앱 파일 관리
- 파트너사 별 사이트 관리
- 지속적인 사용을 위해 자동화 기능 구현 필요
- 데스크탑/ 모바일 UI 지원(=미디어쿼리)

## 2. 프로젝트 구조

**전체 구조**
![image](https://user-images.githubusercontent.com/58619427/152694813-53afb105-fd1f-4837-b378-1040453c304f.png)

**DB**
![image](https://user-images.githubusercontent.com/58619427/152694802-6a579627-0d90-433e-9a1f-441293e251cd.png)

**디렉토리 구조**
![image](https://user-images.githubusercontent.com/58619427/152694906-32a5b96a-17cb-49b9-8cae-932d990c8e9e.png)

**skills**
![image](https://user-images.githubusercontent.com/58619427/152694885-3896de6a-87a4-4dae-aba8-8c9d7d16bcfc.png)



```sh
npm install my-crazy-module --save
```

윈도우:

```sh
edit autoexec.bat
```

## 3. 프로젝트 기능

**1)Crete - App 및 기업 정보**

![image](https://user-images.githubusercontent.com/58619427/152695027-79373e23-980f-4446-a820-81f8bccf6f02.png)


스크린 샷과 코드 예제를 통해 사용 방법을 자세히 설명합니다.

_더 많은 예제와 사용법은 [Wiki][wiki]를 참고하세요._

## 개발 환경 설정

모든 개발 의존성 설치 방법과 자동 테스트 슈트 실행 방법을 운영체제 별로 작성합니다.

```sh
make install
npm test
```

## 업데이트 내역

* 0.2.1
    * 수정: 문서 업데이트 (모듈 코드 동일)
* 0.2.0
    * 수정: `setDefaultXYZ()` 메서드 제거
    * 추가: `init()` 메서드 추가
* 0.1.1
    * 버그 수정: `baz()` 메서드 호출 시 부팅되지 않는 현상 (@컨트리뷰터 감사합니다!)
* 0.1.0
    * 첫 출시
    * 수정: `foo()` 메서드 네이밍을 `bar()`로 수정
* 0.0.1
    * 작업 진행 중


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
