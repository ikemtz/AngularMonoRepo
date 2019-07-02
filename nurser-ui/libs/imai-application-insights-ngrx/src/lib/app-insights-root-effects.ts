import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';
import { AppInsightsMonitoringService } from './app-insights-monitoring.service';

class AppInsightsBaseffects {
    constructor(
        protected actions$: Actions,
        protected monitor: AppInsightsMonitoringService
    ) { }

    public getTrackLoginPipe() {
        return this.actions$.pipe(
            filter(x => x.type.toUpperCase().endsWith('USER FOUND') && (<any>x).payload),
            tap(x => {
                this.monitor.setAuthenticatedUserContext((<any>x).payload.profile.email);
            })
        );
    }
    
    public getTrackLogoutPipe() {
        return this.actions$.pipe(
            filter(x => 0 < x.type.toUpperCase().indexOf('SIGN OUT')),
            tap(x => {
                this.monitor.clearAuthenticatedUserContext();
            })
        );
    }
    public getTrackExceptionsPipe() {
        return this.actions$.pipe(
            filter(x => x.type.toUpperCase().endsWith('ERROR')),
            tap(x => {
                this.monitor.logException((<any>x).payload);
            })
        );
    }
}

@Injectable()
export class AppInsightsVerboseRootEffects extends AppInsightsBaseffects {

    @Effect({ dispatch: false })
    trackEvents = this.actions$.pipe(
        tap(x => {
            this.monitor.logEvent(x.type, (<any>x).payload);
        })
    );

    @Effect({ dispatch: false })
    trackLogin = this.getTrackLoginPipe();

    @Effect({dispatch: false})
    trackLogout = this. getTrackLogoutPipe();

    @Effect({ dispatch: false })
    trackExceptions = this.getTrackExceptionsPipe();

    constructor(
        actions$: Actions,
        monitor: AppInsightsMonitoringService
    ) { super(actions$, monitor) }
}

@Injectable()
export class AppInsightsInfoRootEffects extends AppInsightsBaseffects {

    @Effect({ dispatch: false })
    trackEvents = this.actions$.pipe(
        tap(x => {
            this.monitor.logEvent(x.type, null);
        })
    );

    @Effect({ dispatch: false })
    trackLogin = this.getTrackLoginPipe();

    @Effect({dispatch: false})
    trackLogout = this. getTrackLogoutPipe();

    @Effect({ dispatch: false })
    trackExceptions = this.getTrackExceptionsPipe();

    constructor(
        actions$: Actions,
        monitor: AppInsightsMonitoringService
    ) { super(actions$, monitor) }
}
