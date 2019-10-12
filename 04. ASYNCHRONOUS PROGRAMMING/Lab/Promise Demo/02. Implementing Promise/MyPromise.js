class MyPromise {
    constructor(executor) {
        this._resolveCallback = {};
        this._rejectCallback = {};

        //Context of the functions will be the instance
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        executor(this.resolve, this.reject);
    };

    then(successFunc) {
        this._resolveCallback = successFunc;

        //Used for chaining
        return this;
    };

    catch(errorFunc) {
        this._rejectCallback = errorFunc;

        //Used for chaining
        return this;
    };

    resolve(data) {
        this._resolveCallback(data);
    };

    reject(data) {
        this._rejectCallback(data);
    };
};