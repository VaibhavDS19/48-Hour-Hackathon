function sortfunc(a, b) {
    if (a[1] === b[1]) {
        return 0
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function calc_hours(subjects, free_hours) {
    let required_hours = 0;
    for (let i = 0; i < subjects.length; i++) {
        required_hours += subjects[i][3];
    }
    if (required_hours > free_hours) {
        let option = prompt("Your free time is less than the required hours.\n" +
            "Do you want to calculate by ignoring some topics (enter 1) or \n" +
            "Do you want to calculate in terms of ratio (enter anything else): ")

        if (option != '1') {
            for (let i = 0; i < subjects.length; i++) {
                subjects[i][3] *= free_hours / required_hours
            }
            subjects.sort(sortfunc);
        }
        else {
            subjects.sort(sortfunc);
            let s = 0;
            for (let i = 0; i < subjects.length; i++) {
                s += subjects[i][3];
                if (s > free_hours) {
                    subjects[i][3] -= (s - free_hours)
                    const subject = subjects.slice(0, i + 1);
                    subjects = subject;
                    break
                }
                else if (s == free_hours) {
                    subjects = subjects.slice(0, i + 1)
                    break
                }
            }
        }
    }
    else {
        subjects.sort(sortfunc);
    }
    return subjects;
}

function scheduler(subjects) {
    let diffs = Array(3)
    diffs[0] = 0
    diffs[1] = 0
    diffs[2] = 0
    for (let i = 0; i < subjects.length; i++) {
        diffs[subjects[i][2] - 1] += 1;
    }
    let check = (diffs[2] <= (diffs[1] + diffs[0] + 1));
    if (!check) {
        num_breaks = diffs[2] - (diffs[1] + diffs[0] + 1);
    }
    let diffs_order = Array(3)
    diffs_order[0] = Array()
    diffs_order[1] = Array()
    diffs_order[2] = Array()
    for (let i = 0; i < subjects.length; i++) {
        diffs_order[subjects[i][2] - 1].push(subjects[i])
    }

    return diffs_order;
}

function end(subs) {
    let now = 0
    // Completes all hard
    while ((subs[2].length) > 0) {
        let message = "Study " + subs[2][0][0] + " for " + subs[2][0][3] + "hours\n";
        alert(message);
        subs[2].shift()
        if ((subs[now].length) > 0) {
            alert(subs[now][0][0]);
            subs[now].shift();
            now = 1 - now;
        }
        else {
            now = 1 - now;
            if ((subs[now][0].length) > 0) {
                alert(subs[now][0][0]);
                subs[now].shift();
            }
            else {
                if ((subs[2].length) > 0) {
                    alert("Take 15 mins break")
                }
            }
        }
    }
    //Completes all medium
    while ((subs[1].length) > 0) {
        alert(subs[1][0]);
        subs[1].shift();
        if ((subs[0].length) > 0) {
            alert(subs[0][0]);
            subs[0].shift();
        }
        else {
            if ((subs[1].length) > 0) {
                alert("Take 10 mins break");
            }
        }
    }
    //Completes all easy
    while ((subs[0].length) > 0) {
        alert(subs[0][0]);
        subs[0].shift();
        if ((subs[0].length) > 0) {
            alert("Take 10 mins break");
        }
        alert("Schedule done")
    }
}
function func() {
    subjects = fn();
    let free_hours = Number(prompt("Enter number of free hours: "))
    subjects = calc_hours(subjects, free_hours)
    subjects = scheduler(subjects)
    end(subjects)
}

function input() {
    let subs = Array(3);
    let s1 = Array(4);
    s1[0] = "OS"
    s1[1] = 10
    s1[2] = 2
    s1[3] = 3

    let s2 = Array(4);
    s2[0] = "SE"
    s2[1] = 1
    s2[2] = 3
    s2[3] = 2

    let s3 = Array(4);
    s3[0] = "CN"
    s3[1] = 2
    s3[2] = 3
    s3[3] = 3
    subs[0] = s1;
    subs[1] = s2;
    subs[2] = s3;
    return subs;
}

function fn() {
    let n = Number(prompt("Enter the number of topics: "))
    let subs = Array(n);
    for (let i = 0; i < n; i++) {
        let arr = prompt('Enter subject_name, priority ( 1 to n ), difficulty (1 easy, 2 medium, 3 hard), expected hours to complete topic')
        let arrs = arr.split(' ')
        arrs[1] = Number(arrs[1])
        arrs[2] = Number(arrs[2])
        arrs[3] = Number(arrs[3])
        subs[i] = arrs;
    }
    return subs;
}