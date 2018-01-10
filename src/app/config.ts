import {environment} from "../environments/environment";

export class Config {

  /**
   * 로컬과 원격서버의 설정을 다르게 하려면 이부분을 true 로 함.
   * @type {boolean}
   */
  private CONVERT             : boolean = false;

  /**
   * 소켓 IP address 와 포트 를 지정함.
   * @type {string}
   */
  //private SOCKET_ADDRESS      : string  = '115.71.233.53';
  private SOCKET_ADDRESS      : string  = '127.0.0.1';
  private SOCKET_PORT         : string  = '5000';

  /**
   * API 서버를 지정함.
   * @type {string}
   */
  private API_ADDRESS         : string  = '115.71.233.53';
  private API_PORT            : string  = '8080';
  private API_ROOT            : string  = '/api';

  /**
   * 개발용 아이피를 지정함.
   * @type {string}
   */
  private DEV_ADDRESS         : string  = '127.0.0.1';

  /**
   * 현재 프로세스가 배포 가능 한 상태인지 확인
   * 이값은 바꾸면 안됨.
   * @type {boolean}
   */
  private BUILD               : boolean = environment.production;


  /**
   * 각 주소 반환 값
   */
  public API_URL             : string;
  public SOCKET_URL          : string;

  constructor() {
    (this.CONVERT) ? this.convert() : this.noConvert();
  }

  private convert(): void {
    if ( this.BUILD ) {
      this.API_URL = `http://${this.API_ADDRESS}:${this.API_PORT}${this.API_ROOT}`;
      this.SOCKET_URL = `http://${this.SOCKET_ADDRESS}:${this.SOCKET_PORT}`;
    }

    if ( this.BUILD === false ) {
      this.API_URL = `http://${this.DEV_ADDRESS}:${this.API_PORT}${this.API_ROOT}`;
      this.SOCKET_URL = `http://${this.DEV_ADDRESS}:${this.SOCKET_PORT}`;
    }
  }

  private noConvert(): void {
    this.API_URL = `http://${this.API_ADDRESS}:${this.API_PORT}${this.API_ROOT}`;
    this.SOCKET_URL = `http://${this.SOCKET_ADDRESS}:${this.SOCKET_PORT}`;
  }

}
